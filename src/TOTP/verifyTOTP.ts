import { main } from "../index"
import toolbx from "toolbx"

export const verifyTOTP = (user: string, TOTPtoken: string, ip: any) => {
    let result: any = {}
    const time: string = new Date().toLocaleString()
    if (main['conf'][user]) {
        if (toolbx.TOTPtokenization(main['conf'][user]['seed']) == TOTPtoken) {
            result.success = true;
        } else {
            result.success = false;
        }
    } else {
        result.success = false;
    }
    if (result.success) {
        toolbx.logger(`[verifyTOTP] <${time}> [ PASS  ] ${user} from ${ip.address} `, 0)
    } else {
        toolbx.logger(`[verifyTOTP] <${time}> [BLOCKED] ${user} from ${ip.address} `, 0)
    }
    return result;
}