// Node.js script to call 4 POST APIs and generate a Maestro YAML test file from their results

const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Example API endpoints — replace with your actual URLs
const REALTO_APP_SERVER_URL = "http://192.168.1.5:7002";
const endpoints = {
    userData: REALTO_APP_SERVER_URL + '/getUserDetails',
    residentialProperty: REALTO_APP_SERVER_URL + "/residentialPropertyListings",
    //   commercialProperty: "https://yourapi.com/property/commercial",
    //   residentialCustomer: "https://yourapi.com/customer/residential",
    //   commercialCustomer: "https://yourapi.com/customer/commercial"
};

const outputYamlFile = path.join(__dirname, "generated_maestro_test.yaml");

// Helper to format a tap/assert step
const createAssertStep = (label) => `- assertVisible: \"${label}\"`;
const createTapStep = (label) => `- tapOn: \"${label}\"`;

function generateYamlFromApi() {
    try {
        const resUser = axios.post(endpoints.userData, {
            mobile: "9833097594",
            country: "IN",
            country_code: "91"
        }).then(r => r.data);

        console.log("User data fetched:", resUser);
        const req_user_id = resUser.id;
        const agent_id = resUser.works_for;

        const resProp = axios.post(endpoints.residentialProperty, {
            req_user_id: req_user_id,
            agent_id: agent_id,
        }).then(r => r.data);

        // const comProp = axios.post(endpoints.commercialProperty, {}).then(r => r.data);
        // const resCust = axios.post(endpoints.residentialCustomer, {}).then(r => r.data);
        // const comCust = axios.post(endpoints.commercialCustomer, {}).then(r => r.data);

        Promise.all([resProp, comProp, resCust, comCust]).then(([resPropData, comPropData, resCustData, comCustData]) => {
            const yamlLines = [
                "appId: com.realtoapp",
                "---",
                "- launchApp",
                "- waitFor: 2000",
                "# --- Residential Properties ---"
            ];

            resPropData.slice(0, 2).forEach((p) => {
                yamlLines.push(createAssertStep(`Reference id: ${p.property_id}`));
            });

            yamlLines.push("# --- Commercial Properties ---");
            comPropData.slice(0, 2).forEach((p) => {
                yamlLines.push(createAssertStep(`Reference id: ${p.property_id}`));
            });

            yamlLines.push("# --- Residential Customers ---");
            resCustData.slice(0, 2).forEach((c) => {
                yamlLines.push(createAssertStep(c.name || c.mobile));
            });

            yamlLines.push("# --- Commercial Customers ---");
            comCustData.slice(0, 2).forEach((c) => {
                yamlLines.push(createAssertStep(c.name || c.mobile));
            });

            fs.writeFileSync(outputYamlFile, yamlLines.join("\n"), "utf8");
            console.log(`✅ Generated Maestro test at ${outputYamlFile}`);
        });
    } catch (err) {
        console.error("❌ Error generating Maestro YAML from API:", err.message);
    }
}

generateYamlFromApi();
