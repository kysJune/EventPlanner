const logger = (message) => {
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    console.log(`[${timestamp}] ${message}`);

    // Send logs to the database
};

export default logger;
