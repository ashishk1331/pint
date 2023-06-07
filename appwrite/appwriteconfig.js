import { Account,Client,Databases,Storage } from "appwrite";
const client=new Client();
export const databases = new Databases(client);
export const storage = new Storage(client);
import { variables } from "./variables";
client
.setEndpoint(variables.APPWRITE_ENDPOINT)
.setProject(variables.APPWRITE_SECRETKEY);

export const account= new Account(client);