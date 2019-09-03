import { configure } from 'log4js';
export class LogManager {
    public static initLog(): void {
        configure({
            appenders: {
                out: { type: 'stdout' },//设置是否在控制台打印日志
                ruleConsole: { type: 'console' },
                ruleFile: {
                    type: process.env.NODE_ENV !== 'dev' ? 'dateFile' : 'console',
                    filename: 'logs/server',
                    pattern: 'yyyy-MM-dd.log',
                    maxLogSize: 10 * 1000 * 1000,
                    numBackups: 3,
                    alwaysIncludePattern: true
                }
            },
            categories: {
                default: {
                    appenders: ['out', 'ruleFile'],
                    level: 'info'
                }
            }
        });
    }
}
