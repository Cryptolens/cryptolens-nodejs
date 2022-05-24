const got = require("got");
const helpers = require("../internal/HelperMethods.js");

module.exports = class Key {
  static Activate(
    token,
    rsaPubKey,
    ProductId,
    Key,
    MachineCode = "",
    FieldsToReturn = 0,
    Metadata = false,
    FloatingTimeInterval = 0,
    MaxOverdraft = 0,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/Activate`, {
              form: {
                token: token,
                ProductId: ProductId,
                Key: Key,
                MachineCode: MachineCode,
                FieldsToReturn: FieldsToReturn,
                Metadata: Metadata,
                FloatingTimeInterval: FloatingTimeInterval,
                MaxOverdraft: MaxOverdraft,
                Sign: true,
                SignMethod: 1,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            if (helpers.VerifySignature(body, rsaPubKey)) {
              var license = JSON.parse(
                Buffer.from(body["licenseKey"], "base64").toString("utf-8")
              );
              license.RawResponse = body;
              resolve(license);
            } else {
              console.warn("Signature verification failed.");
              resolve(null);
            }
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  static Deactivate(
    token,
    ProductId,
    Key,
    MachineCode = "",
    Floating = false,
    OSInfo = null,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/Deactivate`, {
              form: {
                token: token,
                ProductId: ProductId,
                Key: Key,
                MachineCode: MachineCode,
                Floating: Floating,
                OSInfo: OSInfo,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            console.warn(body.message);
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  static CreateTrialKey(
    token,
    ProductId,
    MachineCode = "",
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const body = await got
          .post(`${LicenseServerUrl}/api/key/CreateTrialKey`, {
            form: {
              token: token,
              ProductId: ProductId,
              MachineCode: MachineCode,
            },
          })
          .json();
        console.log(body);
        if (body.result == "1") {
          console.warn(body.message);
          resolve(null);
        } else {
          console.warn(body.message);
          resolve(body.key);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  static CreateKey(
    token,
    ProductId,
    Period,
    Notes = "",
    Block = false,
    CustomerId = null,
    TrialActivation = false,
    MaxNoOfMachines = 0,
    AllowedMachines = null,
    ResellerId = 0,
    NoOfKeys = 1,
    F1 = false,
    F2 = false,
    F3 = false,
    F4 = false,
    F5 = false,
    F6 = false,
    F7 = false,
    F8 = false,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/CreateKey`, {
              form: {
                token: token,
                ProductId: ProductId,
                Period: Period,
                Notes: Notes,
                Block: Block,
                CustomerId: CustomerId,
                TrialActivation: TrialActivation,
                MaxNoOfMachines: MaxNoOfMachines,
                AllowedMachines: AllowedMachines,
                ResellerId: ResellerId,
                NoOfKeys: NoOfKeys,
                F1: F1,
                F2: F2,
                F3: F3,
                F4: F4,
                F5: F5,
                F6: F6,
                F7: F7,
                F8: F8,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            console.warn(body.message);
            resolve(body);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  static CreateKeyNewCustomer(
    token,
    ProductId,
    Period,
    Name,
    Email,
    CompanyName,
    EnableCustomerAssociation = false,
    AllowActivationManagement = false,
    AllowMultipleUserAssociation = false,
    MaxNoOfMachines = 0,
    F1 = false,
    F2 = false,
    F3 = false,
    F4 = false,
    F5 = false,
    F6 = false,
    F7 = false,
    F8 = false,
    AllowedMachines = null,
    TrialActivation = false,
    Block = false,
    Notes = "",
    ResellerId = 0,
    NoOfKeys = 1,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/CreateKey`, {
              form: {
                token: token,
                ProductId: ProductId,
                Period: Period,
                Notes: Notes,
                Block: Block,
                NewCustomer: true,
                Name: Name,
                Email: Email,
                CompanyName: CompanyName,
                EnableCustomerAssociation: EnableCustomerAssociation,
                AllowActivationManagement: AllowActivationManagement,
                AllowMultipleUserAssociation: AllowMultipleUserAssociation,
                TrialActivation: TrialActivation,
                MaxNoOfMachines: MaxNoOfMachines,
                AllowedMachines: AllowedMachines,
                ResellerId: ResellerId,
                NoOfKeys: NoOfKeys,
                F1: F1,
                F2: F2,
                F3: F3,
                F4: F4,
                F5: F5,
                F6: F6,
                F7: F7,
                F8: F8,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            console.warn(body.message);
            resolve(body);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  static CreateKeyAddOrUseExistingCustomer(
    token,
    ProductId,
    Period,
    Name,
    Email,
    CompanyName,
    EnableCustomerAssociation = false,
    AllowActivationManagement = false,
    AllowMultipleUserAssociation = false,
    MaxNoOfMachines = 0,
    F1 = false,
    F2 = false,
    F3 = false,
    F4 = false,
    F5 = false,
    F6 = false,
    F7 = false,
    F8 = false,
    AllowedMachines = null,
    TrialActivation = false,
    Block = false,
    Notes = "",
    ResellerId = 0,
    NoOfKeys = 1,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/CreateKey`, {
              form: {
                token: token,
                ProductId: ProductId,
                Period: Period,
                Notes: Notes,
                Block: Block,
                AddOrUseExistingCustomer: true,
                Name: Name,
                Email: Email,
                CompanyName: CompanyName,
                EnableCustomerAssociation: EnableCustomerAssociation,
                AllowActivationManagement: AllowActivationManagement,
                AllowMultipleUserAssociation: AllowMultipleUserAssociation,
                TrialActivation: TrialActivation,
                MaxNoOfMachines: MaxNoOfMachines,
                AllowedMachines: AllowedMachines,
                ResellerId: ResellerId,
                NoOfKeys: NoOfKeys,
                F1: F1,
                F2: F2,
                F3: F3,
                F4: F4,
                F5: F5,
                F6: F6,
                F7: F7,
                F8: F8,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            console.warn(body.message);
            resolve(body);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  static GetKey(
    token,
    rsaPubKey,
    ProductId,
    Key,
    FieldsToReturn = 0,
    Metadata = false,
    LicenseServerUrl = "https://api.cryptolens.io"
  ) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const body = await got
            .post(`${LicenseServerUrl}/api/key/GetKey`, {
              form: {
                token: token,
                ProductId: ProductId,
                Key: Key,
                FieldsToReturn: FieldsToReturn,
                Metadata: Metadata,
                Sign: true,
                SignMethod: 1,
              },
            })
            .json();

          if (body.result == "1") {
            console.warn(body.message);
            resolve(null);
          } else {
            if (helpers.VerifySignature(body, rsaPubKey)) {
              var license = JSON.parse(
                Buffer.from(body["licenseKey"], "base64").toString("utf-8")
              );
              license.RawResponse = body;
              resolve(license);
            } else {
              console.warn("Signature verification failed.");
              resolve(null);
            }
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
};
