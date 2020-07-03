import Logger from '../src/utils/Logger.ts';
const mrlogger: Logger = new Logger('testing');
Logger.DEBUG_ENABLED = true;
mrlogger.debug('heyyyy ;)');
mrlogger.warn('how are ya?');
mrlogger.notice(':flushed:');