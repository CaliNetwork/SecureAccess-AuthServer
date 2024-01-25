import { main } from "../index";
import toolbx from "toolbx";
import os from "os";

export const InitTOTP = () => {
    let token: any = {};
    if (main.debug) {
        toolbx.logger("Checking if TOTP has been configured", 4);
    }
    if (!main.conf.seed) {
        toolbx.logger("[InitTOTP] TOTP Seed is not configured, please re-run again with para: -setup", 3)
        token.pass = false;
    } else {
        if (main.conf.seed.length !== 16) {
            toolbx.logger("[InitTOTP] TOTP Seed is not configured properly, please re-run again with para: -setup", 3);
            token.pass = false;
        }
    }
    if (token.pass) {
        toolbx.logger("[InitTOTP] TOTP configured", 4);
    } else {
        if (main.debug) {
            toolbx.logger("Crashed at TOTP/InitTOTP", 4);
        }
        process.exit(1);
    }
}
export const setupTOTP = async () => {
    const seed = await toolbx.TOTPseeding()
    const qrcode = await require('qrcode-terminal');
    toolbx.logger(`[setupTOTP] Input by yourself: ${seed}`, 0);
    toolbx.logger("Or scan this QRcode", 0);
    const url: string = `otpauth://totp/${await os.hostname()}?secret=${seed}&issuer=SecureAccess`
    if (main.debug) {
        toolbx.logger(`[setupTOTP] generated seed=${seed}, URL=${url}`, 4)
    }
    qrcode.generate(url, { small: true });
    //write seed into conf file
}