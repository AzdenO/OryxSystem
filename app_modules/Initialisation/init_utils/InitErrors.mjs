export class CoreLoadError extends Error {
    constructor(service) {
        super(`Unable to load core service: ${service}`);
        this.code = "CORE_LOAD_ERROR";
        this.name = "CoreLoadError";
    }
}