namespace ProductionAssistant;

public static class AutomationLauncher
{
    public static async Task RunAsync(string taskType, string taskId)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(taskType) || string.IsNullOrWhiteSpace(taskId))
                Environment.ExitCode = (int)Models.DailyReportExitCode.JobNotFound;
            else
                Environment.ExitCode = (await AppServices.AutomationTasks.RunAsync(taskType, taskId)).Result.ExitCode;
        }
        catch
        {
            Environment.ExitCode = (int)Models.DailyReportExitCode.JobNotFound;
        }
    }
}
