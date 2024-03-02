import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '../users/entities/user.entity';

// Understanding how GqlCurrentUser works with AuthenticatedGuard and the custom passport strategy:
// When invoking @UseGuards(AuthenticatedGuard), the custom passport strategy
// is invoked with the request. The strategy calls the auth service
// which fetches the supabase user and then the DB User
// It injects the result into the gql context
// under our own key called "user"
// When using the GqlCurrentUser decorator, it extracts the GQL context
// and reads the user value that was just set on the context.
// This now contains the user object we want.

export const GqlCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.dbUser as User;
  },
);

export const GqlSupabaseUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user.supabaseUser as SupabaseUser;
  },
);

export const RestCurrentUser = createParamDecorator((data: unknown, req) => {
  return req.user;
});
