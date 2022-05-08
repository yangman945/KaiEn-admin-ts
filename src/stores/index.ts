import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

// import AuthModule from "./modules/AuthModule";
import BodyModule from "./modules/BodyModule";
import BreadcrumbsModule from "./modules/BreadcrumbsModule";
import ConfigModule from "./modules/ConfigModule";
import UserModele from './modules/userModule'

config.rawError = true;

const store = createStore({
  modules: {
    UserModele,
    // AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
  },
});

export default store;
