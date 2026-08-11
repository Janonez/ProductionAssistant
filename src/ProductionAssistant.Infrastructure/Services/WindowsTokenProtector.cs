using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text;

namespace ProductionAssistant.Services;

internal static class WindowsTokenProtector
{
    private const uint CryptProtectUiForbidden = 0x1;

    public static string Protect(string plainText) =>
        Convert.ToBase64String(Transform(Encoding.UTF8.GetBytes(plainText), true));

    public static string Unprotect(string protectedText)
    {
        if (string.IsNullOrWhiteSpace(protectedText)) return string.Empty;
        return Encoding.UTF8.GetString(Transform(Convert.FromBase64String(protectedText), false));
    }

    private static byte[] Transform(byte[] input, bool protect)
    {
        var inputBlob = new DataBlob();
        var outputBlob = new DataBlob();
        try
        {
            inputBlob.Size = input.Length;
            inputBlob.Data = Marshal.AllocHGlobal(input.Length);
            Marshal.Copy(input, 0, inputBlob.Data, input.Length);

            var succeeded = protect
                ? CryptProtectData(
                    ref inputBlob, null, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero,
                    CryptProtectUiForbidden, out outputBlob)
                : CryptUnprotectData(
                    ref inputBlob, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero,
                    CryptProtectUiForbidden, out outputBlob);
            if (!succeeded) throw new Win32Exception(Marshal.GetLastWin32Error());

            var output = new byte[outputBlob.Size];
            Marshal.Copy(outputBlob.Data, output, 0, outputBlob.Size);
            return output;
        }
        finally
        {
            if (inputBlob.Data != IntPtr.Zero) Marshal.FreeHGlobal(inputBlob.Data);
            if (outputBlob.Data != IntPtr.Zero) LocalFree(outputBlob.Data);
        }
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct DataBlob
    {
        public int Size;
        public IntPtr Data;
    }

    [DllImport("crypt32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool CryptProtectData(
        ref DataBlob dataIn,
        string? description,
        IntPtr optionalEntropy,
        IntPtr reserved,
        IntPtr promptStruct,
        uint flags,
        out DataBlob dataOut);

    [DllImport("crypt32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    private static extern bool CryptUnprotectData(
        ref DataBlob dataIn,
        IntPtr description,
        IntPtr optionalEntropy,
        IntPtr reserved,
        IntPtr promptStruct,
        uint flags,
        out DataBlob dataOut);

    [DllImport("kernel32.dll")]
    private static extern IntPtr LocalFree(IntPtr memory);
}
