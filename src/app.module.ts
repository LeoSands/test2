import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getMesh, MeshInstance } from '@graphql-mesh/runtime';
import { findAndParseConfig } from '@graphql-mesh/cli';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        let mesh: MeshInstance;
        try {
          console.log('Starting to load Mesh config');
          const meshConfig = await findAndParseConfig();
          mesh = await getMesh(meshConfig);
        } catch (e) {
          console.error('Error initializing GraphQL Mesh: ', e);
          throw e;
        }
        return {
          schema: mesh.schema,
          context: ({ req }) => ({ ...req, mesh }),
          introspection: true,
        }
      },
    }),
  ],
})
export class AppModule {}
