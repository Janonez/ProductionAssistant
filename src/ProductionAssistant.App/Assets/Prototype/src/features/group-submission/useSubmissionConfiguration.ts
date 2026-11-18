import { useCallback, useEffect, useRef, useState } from 'react'
import { invoke } from '../../bridge/index'
import type { ConfigurationSaveResult, SaveConfiguration, SubmissionConfiguration } from './business-configuration.types'

function validateResponse(value: SubmissionConfiguration) {
  if (!Number.isSafeInteger(value?.revision) || !Array.isArray(value.businesses) || !value.rules || !Array.isArray(value.dataOptions))
    throw new Error('集团填报配置响应无效，请重新读取。')
  return value
}

export function useSubmissionConfiguration(documentId?: string, documentRevision = 0) {
  const scope = JSON.stringify([documentId, documentRevision])
  const activeScope = useRef(scope)
  activeScope.current = scope
  const queue = useRef(Promise.resolve())
  const current = useRef<{ scope: string; value: SubmissionConfiguration }>(undefined)
  const [snapshot, setSnapshot] = useState(current.current)
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    setLoading(true)
    setLoadError('')
    const request = queue.current.then(async () => {
      try {
        const value = validateResponse(await invoke<SubmissionConfiguration>('groupSubmission.getConfiguration', { documentId }))
        if (scope !== activeScope.current) return undefined
        current.current = { scope, value }
        setSnapshot(current.current)
        return value
      } catch (error) {
        if (scope === activeScope.current) setLoadError(error instanceof Error ? error.message : '读取集团填报配置失败。')
        return undefined
      } finally {
        if (scope === activeScope.current) setLoading(false)
      }
    })
    queue.current = request.then(() => {})
    return request
  }, [documentId, scope])

  useEffect(() => { void refresh() }, [refresh])

  const save: SaveConfiguration = useCallback(change => {
    const request = queue.current.then(async (): Promise<ConfigurationSaveResult> => {
      const base = current.current
      if (base?.scope !== scope || activeScope.current !== scope) return { error: '配置尚未读取，请稍后重试。' }
      try {
        const result = await invoke<ConfigurationSaveResult>('groupSubmission.saveConfiguration', {
          revision: base.value.revision, documentId, documentRevision, ...change,
        })
        if (result.configuration && activeScope.current === scope) {
          current.current = { scope, value: validateResponse(result.configuration) }
          setSnapshot(current.current)
        }
        return result
      } catch (error) {
        return { error: error instanceof Error ? error.message : '保存失败，请重试。' }
      }
    })
    queue.current = request.then(() => {})
    return request
  }, [documentId, documentRevision, scope])

  return { configuration: snapshot?.value, loading, loadError, refresh, save }
}
