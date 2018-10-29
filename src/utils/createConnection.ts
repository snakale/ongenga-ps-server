import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeORMConnection = async () => {

    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV.trim());

    //return createConnection(connectionOptions);

    return createConnection({
        ...{}, 
        ...connectionOptions, 
        ...{ name: "default" }
    });

}
