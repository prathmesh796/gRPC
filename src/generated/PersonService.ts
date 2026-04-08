// Original file: src/a.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddPersonResponse as _AddPersonResponse, AddPersonResponse__Output as _AddPersonResponse__Output } from './AddPersonResponse.js';
import type { GetPersonByNameRequest as _GetPersonByNameRequest, GetPersonByNameRequest__Output as _GetPersonByNameRequest__Output } from './GetPersonByNameRequest.js';
import type { GetPersonByNameResponse as _GetPersonByNameResponse, GetPersonByNameResponse__Output as _GetPersonByNameResponse__Output } from './GetPersonByNameResponse.js';
import type { Person as _Person, Person__Output as _Person__Output } from './Person.js';

export interface PersonServiceClient extends grpc.Client {
  addPerson(argument: _Person, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AddPersonResponse__Output>): grpc.ClientUnaryCall;
  addPerson(argument: _Person, metadata: grpc.Metadata, callback: grpc.requestCallback<_AddPersonResponse__Output>): grpc.ClientUnaryCall;
  addPerson(argument: _Person, options: grpc.CallOptions, callback: grpc.requestCallback<_AddPersonResponse__Output>): grpc.ClientUnaryCall;
  addPerson(argument: _Person, callback: grpc.requestCallback<_AddPersonResponse__Output>): grpc.ClientUnaryCall;
  
  getPersonByName(argument: _GetPersonByNameRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_GetPersonByNameResponse__Output>): grpc.ClientUnaryCall;
  getPersonByName(argument: _GetPersonByNameRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_GetPersonByNameResponse__Output>): grpc.ClientUnaryCall;
  getPersonByName(argument: _GetPersonByNameRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_GetPersonByNameResponse__Output>): grpc.ClientUnaryCall;
  getPersonByName(argument: _GetPersonByNameRequest, callback: grpc.requestCallback<_GetPersonByNameResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PersonServiceHandlers extends grpc.UntypedServiceImplementation {
  addPerson: grpc.handleUnaryCall<_Person__Output, _AddPersonResponse>;
  
  getPersonByName: grpc.handleUnaryCall<_GetPersonByNameRequest__Output, _GetPersonByNameResponse>;
  
}

export interface PersonServiceDefinition extends grpc.ServiceDefinition {
  addPerson: MethodDefinition<_Person, _AddPersonResponse, _Person__Output, _AddPersonResponse__Output>
  getPersonByName: MethodDefinition<_GetPersonByNameRequest, _GetPersonByNameResponse, _GetPersonByNameRequest__Output, _GetPersonByNameResponse__Output>
}
