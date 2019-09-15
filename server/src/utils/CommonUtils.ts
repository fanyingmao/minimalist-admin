import { exec, ExecException } from "child_process";
/**
 * 对命令调用promis封装
 * @param cmd 调用命令
 */
export const asyncExec = async (cmd: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (cmd) {
      exec(cmd, (err: ExecException, stdout: string, stderr: string) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout);
      });
    }
  });
}
