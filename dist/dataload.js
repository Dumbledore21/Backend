"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let totJason = null;
        console.log("Check");
        for (let i = 0; i < 3; i++) {
            // get URI 
            let uri = "xxx";
            let jsonInfo = yield getName(uri);
            jsonInfo["internalRef"] = i + 1;
            jsonInfo["URIForMinting"] = i + 1;
            totJason++;
        }
    });
}
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    };
    rawFile.send(null);
}
const getName = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch(uri);
        let responseJson = yield response.json();
        return responseJson;
    }
    catch (error) {
        console.error(error);
    }
});
