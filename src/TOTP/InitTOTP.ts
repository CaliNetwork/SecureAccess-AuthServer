import { main } from "../index";
import toolbx from "toolbx";
import os from "os";

const isTOTPConfigured = (seed: string, user: string) => {
    let token: any = {};
    if (main.debug) toolbx.logger(`[isTOTPConfigured] Checking for user: ${user}`, 4)
    if (!seed) {
        toolbx.logger(`[InitTOTP] TOTP Seed is not configured, please re-run again with para: -i/--setup $username`, 3)
        token.pass = false;
    } else {
        if (seed.length !== 16) {
            toolbx.logger(`[InitTOTP] TOTP Seed is not configured properly, please re-run again with para: -i/--setup $username`, 3);
            token.pass = false;
        }
    }
    return token.pass
}

export const InitTOTP = () => {
    let token: any = {};
    token.pass = true;
    if (main.debug) {
        toolbx.logger("[InitTOTP] Checking if TOTP has been configured", 4);
    }
    for (const user in main.conf) {
        isTOTPConfigured(main['conf'][user]['seed'], user)
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
export const setupTOTP = async (user: string) => {
    if (user == null || user == 'true') {
        toolbx.logger("[setupTOTP] a username is required", 3);
        process.exit(1);
    } else if (main['conf'][user]) {
        toolbx.logger(`[setupTOTP] user: ${user} already existed`, 3);
        process.exit(1);
    }
    const seed = await toolbx.TOTPseeding()
    const qrcode = await require('qrcode-terminal');
    toolbx.logger(`[setupTOTP] Input by yourself: ${seed}`, 0);
    toolbx.logger("Or scan this QRcode", 0);
    const url: string = `otpauth://totp/${await os.hostname()}?secret=${seed}&issuer=SecureAccess`
    if (main.debug) {
        toolbx.logger(`[setupTOTP] generated seed=${seed}, URL=${url}`, 4)
    }
    qrcode.generate(url, { small: true });
    return seed
}