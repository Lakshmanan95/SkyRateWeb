import {ConfigService} from './com/common/service/config/com.common.service.config.configmanager';
import {AuthValidatorProvider} from './com/common/service/com.service.authvalidator';


export class AppUtil {

  static initConfigFactory(config: ConfigService) {
    return () => config.load();
  }
}
