// button
import ButtonZHCN from "./locale/button/zh_CN";
import ButtonZHTW from "./locale/button/zh_TW";
import ButtonEN from "./locale/button/en_US";

// info
import InfoZHCN from "./locale/info/zh_CN";
import InfoZHTW from "./locale/info/zh_TW";
import InfoEN from "./locale/info/en_US";

// menu
import MenuZHCN from "./locale/menu/zh_CN";
import MenuZHTW from "./locale/menu/zh_TW";
import MenuEN from "./locale/menu/en_US";

// other
import OtherZHCN from "./locale/other/zh_CN";
import OtherZHTW from "./locale/other/zh_TW";
import OtherEN from "./locale/other/en_US";

// const
import ConstLocale from "./locale/const"

// locale-V2
import zh_CN_v2 from "./locale-v2/zh_CN";
import zh_TW_v2 from "./locale-v2/zh_TW";
import en_US_v2 from "./locale-v2/en_US";

import * as xl from "excel4node"
import {writeFile} from "fs"
import * as path from "path";

function getV3(){
    const zh_CN = Object.assign({}, ButtonZHCN, InfoZHCN, MenuZHCN, OtherZHCN, ConstLocale);
    const zh_TW = Object.assign({}, ButtonZHTW, InfoZHTW, MenuZHTW, OtherZHTW, ConstLocale);
    const en_US = Object.assign({}, ButtonEN, InfoEN, MenuEN, OtherEN, ConstLocale);

    return {
        zh_CN,
        zh_TW,
        en_US
    }
}

function getV2(){
    return {
        zh_CN: zh_CN_v2,
        zh_TW: zh_TW_v2,
        en_US: en_US_v2
    }
}

function main(){
    const locale_v3 = getV3();
    const locale_v2 = getV2();

    const wb = new xl.Workbook();

    const ws_v3 = wb.addWorksheet('CDN v3');
    const ws_v2 = wb.addWorksheet('CDN v2');

    const v3Keys = Object.keys(locale_v3.zh_CN);
    const v2Keys = Object.keys(locale_v2.zh_CN);

    v2Keys.forEach((key, index) => {
        // code
        ws_v2.cell(index + 1, 1).string(key);
        // zh_cn
        ws_v2.cell(index + 1, 2).string(locale_v2.zh_CN[key] || "");
        // zh_tw
        ws_v2.cell(index + 1, 3).string(locale_v2.zh_TW[key] || "");
        // eu
        ws_v2.cell(index + 1, 4).string(locale_v2.en_US[key] || "");
    })

    v3Keys.forEach((key, index) => {
        // code
        ws_v3.cell(index + 1, 1).string(key);
        // zh_cn
        ws_v3.cell(index + 1, 2).string(locale_v3.zh_CN[key] || "");
        // zh_tw
        ws_v3.cell(index + 1, 3).string(locale_v3.zh_TW[key] || "");
        // eu
        ws_v3.cell(index + 1, 4).string(locale_v3.en_US[key] || "");
    })

    wb.writeToBuffer().then(function(buffer) {
        // Do something with buffer
        writeFile(path.join(__dirname, "./dist/language.xlsx"), buffer, err => {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        })
    });
}

main();