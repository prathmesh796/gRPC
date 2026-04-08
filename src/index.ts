import path from 'path';
import { fileURLToPath } from 'url';
import * as grpc from '@grpc/grpc-js';
import type { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ProtoGrpcType } from './generated/a.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const PersonService = personProto.PersonService as unknown as ServiceClientConstructor;

let Persons: { name: string, age: number }[] = [];

function addPerson(call: grpc.ServerUnaryCall<{ name: string, age: number }, { message: string }>, callback: grpc.sendUnaryData<{ message: string }>) {
    console.log('Received request for addPerson', call);
    const { name, age } = call.request;
    Persons.push({ name, age });

    callback(null, { message: 'Person added' });
}

function getPersonByName(call: grpc.ServerUnaryCall<{ name: string }, { persons: { name: string, age: number }[] }>, callback: grpc.sendUnaryData<{ persons: { name: string, age: number }[] }>) {
    const name = call.request.name;
    const persons = Persons.filter(person => person.name === name);
    callback(null, { persons });
}

const server = new grpc.Server();

server.addService(PersonService.service, { addPerson, getPersonByName });

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server started on port 50051');
});