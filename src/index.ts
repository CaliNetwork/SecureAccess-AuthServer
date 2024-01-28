//import dependence
import toolbx from "toolbx";
import { Elysia } from "elysia";
import { ip } from "elysia-ip";
import { InitTOTP, setupTOTP } from "./TOTP/InitTOTP";
import { verifyTOTP } from "./TOTP/verifyTOTP";

//init global var


export let main: any = {};
main.args = require('minimist')(Bun.argv.slice(2));
main.ver = "California@1.0.1-OSS";
main.listen = main.args.listen || main.args.l || "127.0.0.1";
main.port = main.args.port || main.args.p || 8089;
main.debug = main.args.v || main.args.verbose;
main.path = import.meta.dir;
main.conf = await Bun.file(`${main.path}/../conf.json`).json();

switch (main.args._[0]) {
    case 'add':
        toolbx.logger(`Setting up SecureAccess™ Server ${main.ver}: Create user`, 2);
        const user = main.args._[1]
        const seed = await setupTOTP(user);
        main['conf'][user] = {
            seed: seed
        }
        try {
            Bun.write(`${main.path}/../conf.json`, JSON.stringify(main.conf))
                .then(() => {
                    toolbx.logger(`[CORE] user: ${user} Created`, 1)
                })
        } catch (error) {
            console.error('[CORE] Failed to write userlist:', error);
        }
        break;
    case 'rm':
        try {
            for (const user of main.args._.slice(1)) {
                if (!main['conf'][user]) {
                    toolbx.logger(`[CORE] user: ${user} doesn't exist`, 3);
                } else {
                    delete main['conf'][user]
                    toolbx.logger(`[CORE] user: ${user} removed`, 1)
                }

            }
            Bun.write(`${main.path}/../conf.json`, JSON.stringify(main.conf));
        } catch (error) {
            console.error('[CORE] Failed to write userlist:', error);
        }
        break;
    case 'list':
        toolbx.logger("[CORE] - User List -", 0)
        for (const user in main.conf) {
            toolbx.logger(`${user}`, 5)
        }
        break;
    default:
        //start
        toolbx.logger(`Launching SecureAccess™ Server ${main.ver}`, 2);
        InitTOTP();
        const app = new Elysia().use(ip())
            .get("/", () => `SecureAccess™ Server ${main.ver}`)
            .get("/auth/:user/:token", ({ params: { user, token }, ip }) => verifyTOTP(user, token, ip))
            .listen({
                hostname: main.listen,
                port: main.port
            });
        if (main.debug) toolbx.logger(`[CORE] Ready to handle inbound requests at http://${main.listen}:${main.port}`, 4);
        break;
}

