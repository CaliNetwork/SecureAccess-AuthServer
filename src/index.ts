//import dependence
import toolbx from "toolbx";
import conf from '../conf.toml'
import { Elysia } from "elysia";
import { InitTOTP, setupTOTP } from "./TOTP/InitTOTP";

//init global var
export let main: any = {}
main.conf = conf
main.args = process.argv
main.ver = "California@1.0.0-OSS"
main.setup = main.args.includes('-i') || main.args.includes('--setup');
main.debug = main.args.includes('-v') || main.args.includes('--verbose');
if (main.setup) {
    //setup
    toolbx.logger(`Setting up SecureAccess™ Server ${main.ver}`, 2);
    setupTOTP();
} else {
    //start
    toolbx.logger(`Launching SecureAccess™ Server ${main.ver}`, 2);
    InitTOTP();
    const app = new Elysia().get("/", () => "Bye Elysia").listen(3001);
}

