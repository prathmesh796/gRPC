import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AddPersonResponse as _AddPersonResponse, AddPersonResponse__Output as _AddPersonResponse__Output } from './AddPersonResponse.js';
import type { GetPersonByNameRequest as _GetPersonByNameRequest, GetPersonByNameRequest__Output as _GetPersonByNameRequest__Output } from './GetPersonByNameRequest.js';
import type { GetPersonByNameResponse as _GetPersonByNameResponse, GetPersonByNameResponse__Output as _GetPersonByNameResponse__Output } from './GetPersonByNameResponse.js';
import type { Person as _Person, Person__Output as _Person__Output } from './Person.js';
import type { PersonServiceClient as _PersonServiceClient, PersonServiceDefinition as _PersonServiceDefinition } from './PersonService.js';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AddPersonResponse: MessageTypeDefinition<_AddPersonResponse, _AddPersonResponse__Output>
  GetPersonByNameRequest: MessageTypeDefinition<_GetPersonByNameRequest, _GetPersonByNameRequest__Output>
  GetPersonByNameResponse: MessageTypeDefinition<_GetPersonByNameResponse, _GetPersonByNameResponse__Output>
  Person: MessageTypeDefinition<_Person, _Person__Output>
  PersonService: SubtypeConstructor<typeof grpc.Client, _PersonServiceClient> & { service: _PersonServiceDefinition }
}

