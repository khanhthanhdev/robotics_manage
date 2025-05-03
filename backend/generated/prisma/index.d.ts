
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Tournament
 * 
 */
export type Tournament = $Result.DefaultSelection<Prisma.$TournamentPayload>
/**
 * Model Stage
 * 
 */
export type Stage = $Result.DefaultSelection<Prisma.$StagePayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>
/**
 * Model MatchReferee
 * 
 */
export type MatchReferee = $Result.DefaultSelection<Prisma.$MatchRefereePayload>
/**
 * Model Alliance
 * 
 */
export type Alliance = $Result.DefaultSelection<Prisma.$AlliancePayload>
/**
 * Model AllianceScoring
 * 
 */
export type AllianceScoring = $Result.DefaultSelection<Prisma.$AllianceScoringPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamAlliance
 * 
 */
export type TeamAlliance = $Result.DefaultSelection<Prisma.$TeamAlliancePayload>
/**
 * Model MatchScores
 * 
 */
export type MatchScores = $Result.DefaultSelection<Prisma.$MatchScoresPayload>
/**
 * Model TeamStats
 * 
 */
export type TeamStats = $Result.DefaultSelection<Prisma.$TeamStatsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  HEAD_REFEREE: 'HEAD_REFEREE',
  ALLIANCE_REFEREE: 'ALLIANCE_REFEREE',
  COMMON: 'COMMON'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StageType: {
  SWISS: 'SWISS',
  PLAYOFF: 'PLAYOFF',
  FINAL: 'FINAL'
};

export type StageType = (typeof StageType)[keyof typeof StageType]


export const CardType: {
  NONE: 'NONE',
  YELLOW: 'YELLOW',
  RED: 'RED'
};

export type CardType = (typeof CardType)[keyof typeof CardType]


export const RefereeRole: {
  HEAD_REFEREE: 'HEAD_REFEREE',
  ALLIANCE_REFEREE: 'ALLIANCE_REFEREE'
};

export type RefereeRole = (typeof RefereeRole)[keyof typeof RefereeRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StageType = $Enums.StageType

export const StageType: typeof $Enums.StageType

export type CardType = $Enums.CardType

export const CardType: typeof $Enums.CardType

export type RefereeRole = $Enums.RefereeRole

export const RefereeRole: typeof $Enums.RefereeRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournament`: Exposes CRUD operations for the **Tournament** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tournaments
    * const tournaments = await prisma.tournament.findMany()
    * ```
    */
  get tournament(): Prisma.TournamentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stage`: Exposes CRUD operations for the **Stage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stages
    * const stages = await prisma.stage.findMany()
    * ```
    */
  get stage(): Prisma.StageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchReferee`: Exposes CRUD operations for the **MatchReferee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchReferees
    * const matchReferees = await prisma.matchReferee.findMany()
    * ```
    */
  get matchReferee(): Prisma.MatchRefereeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alliance`: Exposes CRUD operations for the **Alliance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alliances
    * const alliances = await prisma.alliance.findMany()
    * ```
    */
  get alliance(): Prisma.AllianceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.allianceScoring`: Exposes CRUD operations for the **AllianceScoring** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AllianceScorings
    * const allianceScorings = await prisma.allianceScoring.findMany()
    * ```
    */
  get allianceScoring(): Prisma.AllianceScoringDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamAlliance`: Exposes CRUD operations for the **TeamAlliance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamAlliances
    * const teamAlliances = await prisma.teamAlliance.findMany()
    * ```
    */
  get teamAlliance(): Prisma.TeamAllianceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchScores`: Exposes CRUD operations for the **MatchScores** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchScores
    * const matchScores = await prisma.matchScores.findMany()
    * ```
    */
  get matchScores(): Prisma.MatchScoresDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamStats`: Exposes CRUD operations for the **TeamStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamStats
    * const teamStats = await prisma.teamStats.findMany()
    * ```
    */
  get teamStats(): Prisma.TeamStatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Tournament: 'Tournament',
    Stage: 'Stage',
    Match: 'Match',
    MatchReferee: 'MatchReferee',
    Alliance: 'Alliance',
    AllianceScoring: 'AllianceScoring',
    Team: 'Team',
    TeamAlliance: 'TeamAlliance',
    MatchScores: 'MatchScores',
    TeamStats: 'TeamStats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "tournament" | "stage" | "match" | "matchReferee" | "alliance" | "allianceScoring" | "team" | "teamAlliance" | "matchScores" | "teamStats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Tournament: {
        payload: Prisma.$TournamentPayload<ExtArgs>
        fields: Prisma.TournamentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findFirst: {
            args: Prisma.TournamentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findMany: {
            args: Prisma.TournamentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          create: {
            args: Prisma.TournamentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          createMany: {
            args: Prisma.TournamentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          delete: {
            args: Prisma.TournamentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          update: {
            args: Prisma.TournamentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          deleteMany: {
            args: Prisma.TournamentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          upsert: {
            args: Prisma.TournamentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          aggregate: {
            args: Prisma.TournamentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournament>
          }
          groupBy: {
            args: Prisma.TournamentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentCountAggregateOutputType> | number
          }
        }
      }
      Stage: {
        payload: Prisma.$StagePayload<ExtArgs>
        fields: Prisma.StageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          findFirst: {
            args: Prisma.StageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          findMany: {
            args: Prisma.StageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>[]
          }
          create: {
            args: Prisma.StageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          createMany: {
            args: Prisma.StageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>[]
          }
          delete: {
            args: Prisma.StageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          update: {
            args: Prisma.StageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          deleteMany: {
            args: Prisma.StageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>[]
          }
          upsert: {
            args: Prisma.StageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StagePayload>
          }
          aggregate: {
            args: Prisma.StageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStage>
          }
          groupBy: {
            args: Prisma.StageGroupByArgs<ExtArgs>
            result: $Utils.Optional<StageGroupByOutputType>[]
          }
          count: {
            args: Prisma.StageCountArgs<ExtArgs>
            result: $Utils.Optional<StageCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
      MatchReferee: {
        payload: Prisma.$MatchRefereePayload<ExtArgs>
        fields: Prisma.MatchRefereeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchRefereeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchRefereeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          findFirst: {
            args: Prisma.MatchRefereeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchRefereeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          findMany: {
            args: Prisma.MatchRefereeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>[]
          }
          create: {
            args: Prisma.MatchRefereeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          createMany: {
            args: Prisma.MatchRefereeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchRefereeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>[]
          }
          delete: {
            args: Prisma.MatchRefereeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          update: {
            args: Prisma.MatchRefereeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          deleteMany: {
            args: Prisma.MatchRefereeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchRefereeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchRefereeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>[]
          }
          upsert: {
            args: Prisma.MatchRefereeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchRefereePayload>
          }
          aggregate: {
            args: Prisma.MatchRefereeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchReferee>
          }
          groupBy: {
            args: Prisma.MatchRefereeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchRefereeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchRefereeCountArgs<ExtArgs>
            result: $Utils.Optional<MatchRefereeCountAggregateOutputType> | number
          }
        }
      }
      Alliance: {
        payload: Prisma.$AlliancePayload<ExtArgs>
        fields: Prisma.AllianceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AllianceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AllianceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          findFirst: {
            args: Prisma.AllianceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AllianceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          findMany: {
            args: Prisma.AllianceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>[]
          }
          create: {
            args: Prisma.AllianceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          createMany: {
            args: Prisma.AllianceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AllianceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>[]
          }
          delete: {
            args: Prisma.AllianceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          update: {
            args: Prisma.AllianceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          deleteMany: {
            args: Prisma.AllianceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AllianceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AllianceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>[]
          }
          upsert: {
            args: Prisma.AllianceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlliancePayload>
          }
          aggregate: {
            args: Prisma.AllianceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlliance>
          }
          groupBy: {
            args: Prisma.AllianceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AllianceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AllianceCountArgs<ExtArgs>
            result: $Utils.Optional<AllianceCountAggregateOutputType> | number
          }
        }
      }
      AllianceScoring: {
        payload: Prisma.$AllianceScoringPayload<ExtArgs>
        fields: Prisma.AllianceScoringFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AllianceScoringFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AllianceScoringFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          findFirst: {
            args: Prisma.AllianceScoringFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AllianceScoringFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          findMany: {
            args: Prisma.AllianceScoringFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>[]
          }
          create: {
            args: Prisma.AllianceScoringCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          createMany: {
            args: Prisma.AllianceScoringCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AllianceScoringCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>[]
          }
          delete: {
            args: Prisma.AllianceScoringDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          update: {
            args: Prisma.AllianceScoringUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          deleteMany: {
            args: Prisma.AllianceScoringDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AllianceScoringUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AllianceScoringUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>[]
          }
          upsert: {
            args: Prisma.AllianceScoringUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllianceScoringPayload>
          }
          aggregate: {
            args: Prisma.AllianceScoringAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAllianceScoring>
          }
          groupBy: {
            args: Prisma.AllianceScoringGroupByArgs<ExtArgs>
            result: $Utils.Optional<AllianceScoringGroupByOutputType>[]
          }
          count: {
            args: Prisma.AllianceScoringCountArgs<ExtArgs>
            result: $Utils.Optional<AllianceScoringCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamAlliance: {
        payload: Prisma.$TeamAlliancePayload<ExtArgs>
        fields: Prisma.TeamAllianceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamAllianceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamAllianceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          findFirst: {
            args: Prisma.TeamAllianceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamAllianceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          findMany: {
            args: Prisma.TeamAllianceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>[]
          }
          create: {
            args: Prisma.TeamAllianceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          createMany: {
            args: Prisma.TeamAllianceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamAllianceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>[]
          }
          delete: {
            args: Prisma.TeamAllianceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          update: {
            args: Prisma.TeamAllianceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          deleteMany: {
            args: Prisma.TeamAllianceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamAllianceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamAllianceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>[]
          }
          upsert: {
            args: Prisma.TeamAllianceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamAlliancePayload>
          }
          aggregate: {
            args: Prisma.TeamAllianceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamAlliance>
          }
          groupBy: {
            args: Prisma.TeamAllianceGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamAllianceGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamAllianceCountArgs<ExtArgs>
            result: $Utils.Optional<TeamAllianceCountAggregateOutputType> | number
          }
        }
      }
      MatchScores: {
        payload: Prisma.$MatchScoresPayload<ExtArgs>
        fields: Prisma.MatchScoresFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchScoresFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchScoresFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          findFirst: {
            args: Prisma.MatchScoresFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchScoresFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          findMany: {
            args: Prisma.MatchScoresFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>[]
          }
          create: {
            args: Prisma.MatchScoresCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          createMany: {
            args: Prisma.MatchScoresCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchScoresCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>[]
          }
          delete: {
            args: Prisma.MatchScoresDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          update: {
            args: Prisma.MatchScoresUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          deleteMany: {
            args: Prisma.MatchScoresDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchScoresUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchScoresUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>[]
          }
          upsert: {
            args: Prisma.MatchScoresUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchScoresPayload>
          }
          aggregate: {
            args: Prisma.MatchScoresAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchScores>
          }
          groupBy: {
            args: Prisma.MatchScoresGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchScoresGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchScoresCountArgs<ExtArgs>
            result: $Utils.Optional<MatchScoresCountAggregateOutputType> | number
          }
        }
      }
      TeamStats: {
        payload: Prisma.$TeamStatsPayload<ExtArgs>
        fields: Prisma.TeamStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          findFirst: {
            args: Prisma.TeamStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          findMany: {
            args: Prisma.TeamStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>[]
          }
          create: {
            args: Prisma.TeamStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          createMany: {
            args: Prisma.TeamStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>[]
          }
          delete: {
            args: Prisma.TeamStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          update: {
            args: Prisma.TeamStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          deleteMany: {
            args: Prisma.TeamStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>[]
          }
          upsert: {
            args: Prisma.TeamStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamStatsPayload>
          }
          aggregate: {
            args: Prisma.TeamStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamStats>
          }
          groupBy: {
            args: Prisma.TeamStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamStatsCountArgs<ExtArgs>
            result: $Utils.Optional<TeamStatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    tournament?: TournamentOmit
    stage?: StageOmit
    match?: MatchOmit
    matchReferee?: MatchRefereeOmit
    alliance?: AllianceOmit
    allianceScoring?: AllianceScoringOmit
    team?: TeamOmit
    teamAlliance?: TeamAllianceOmit
    matchScores?: MatchScoresOmit
    teamStats?: TeamStatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdUsers: number
    tournaments: number
    scoredMatches: number
    allianceRefFor: number
    matchReferees: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdUsers?: boolean | UserCountOutputTypeCountCreatedUsersArgs
    tournaments?: boolean | UserCountOutputTypeCountTournamentsArgs
    scoredMatches?: boolean | UserCountOutputTypeCountScoredMatchesArgs
    allianceRefFor?: boolean | UserCountOutputTypeCountAllianceRefForArgs
    matchReferees?: boolean | UserCountOutputTypeCountMatchRefereesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountScoredMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAllianceRefForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllianceScoringWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMatchRefereesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchRefereeWhereInput
  }


  /**
   * Count Type TournamentCountOutputType
   */

  export type TournamentCountOutputType = {
    stages: number
    teams: number
    teamStats: number
  }

  export type TournamentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stages?: boolean | TournamentCountOutputTypeCountStagesArgs
    teams?: boolean | TournamentCountOutputTypeCountTeamsArgs
    teamStats?: boolean | TournamentCountOutputTypeCountTeamStatsArgs
  }

  // Custom InputTypes
  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentCountOutputType
     */
    select?: TournamentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountStagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StageWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountTeamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamStatsWhereInput
  }


  /**
   * Count Type StageCountOutputType
   */

  export type StageCountOutputType = {
    matches: number
    teamStats: number
  }

  export type StageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    matches?: boolean | StageCountOutputTypeCountMatchesArgs
    teamStats?: boolean | StageCountOutputTypeCountTeamStatsArgs
  }

  // Custom InputTypes
  /**
   * StageCountOutputType without action
   */
  export type StageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StageCountOutputType
     */
    select?: StageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StageCountOutputType without action
   */
  export type StageCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * StageCountOutputType without action
   */
  export type StageCountOutputTypeCountTeamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamStatsWhereInput
  }


  /**
   * Count Type MatchCountOutputType
   */

  export type MatchCountOutputType = {
    alliances: number
    referees: number
  }

  export type MatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alliances?: boolean | MatchCountOutputTypeCountAlliancesArgs
    referees?: boolean | MatchCountOutputTypeCountRefereesArgs
  }

  // Custom InputTypes
  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchCountOutputType
     */
    select?: MatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountAlliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllianceWhereInput
  }

  /**
   * MatchCountOutputType without action
   */
  export type MatchCountOutputTypeCountRefereesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchRefereeWhereInput
  }


  /**
   * Count Type AllianceCountOutputType
   */

  export type AllianceCountOutputType = {
    teamAlliances: number
  }

  export type AllianceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamAlliances?: boolean | AllianceCountOutputTypeCountTeamAlliancesArgs
  }

  // Custom InputTypes
  /**
   * AllianceCountOutputType without action
   */
  export type AllianceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceCountOutputType
     */
    select?: AllianceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AllianceCountOutputType without action
   */
  export type AllianceCountOutputTypeCountTeamAlliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamAllianceWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    teamAlliances: number
    teamStats: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamAlliances?: boolean | TeamCountOutputTypeCountTeamAlliancesArgs
    teamStats?: boolean | TeamCountOutputTypeCountTeamStatsArgs
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountTeamAlliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamAllianceWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountTeamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamStatsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    email: string | null
    gender: boolean | null
    DateOfBirth: Date | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: $Enums.UserRole | null
    email: string | null
    gender: boolean | null
    DateOfBirth: Date | null
    phoneNumber: string | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    email: number
    gender: number
    DateOfBirth: number
    phoneNumber: number
    createdAt: number
    updatedAt: number
    createdById: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    gender?: true
    DateOfBirth?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    gender?: true
    DateOfBirth?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    gender?: true
    DateOfBirth?: true
    phoneNumber?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    role: $Enums.UserRole
    email: string | null
    gender: boolean | null
    DateOfBirth: Date | null
    phoneNumber: string | null
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    gender?: boolean
    DateOfBirth?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    tournaments?: boolean | User$tournamentsArgs<ExtArgs>
    scoredMatches?: boolean | User$scoredMatchesArgs<ExtArgs>
    allianceRefFor?: boolean | User$allianceRefForArgs<ExtArgs>
    matchReferees?: boolean | User$matchRefereesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    gender?: boolean
    DateOfBirth?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    gender?: boolean
    DateOfBirth?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    gender?: boolean
    DateOfBirth?: boolean
    phoneNumber?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "email" | "gender" | "DateOfBirth" | "phoneNumber" | "createdAt" | "updatedAt" | "createdById", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
    createdUsers?: boolean | User$createdUsersArgs<ExtArgs>
    tournaments?: boolean | User$tournamentsArgs<ExtArgs>
    scoredMatches?: boolean | User$scoredMatchesArgs<ExtArgs>
    allianceRefFor?: boolean | User$allianceRefForArgs<ExtArgs>
    matchReferees?: boolean | User$matchRefereesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | User$createdByArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      createdUsers: Prisma.$UserPayload<ExtArgs>[]
      tournaments: Prisma.$TournamentPayload<ExtArgs>[]
      scoredMatches: Prisma.$MatchPayload<ExtArgs>[]
      allianceRefFor: Prisma.$AllianceScoringPayload<ExtArgs>[]
      matchReferees: Prisma.$MatchRefereePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      role: $Enums.UserRole
      email: string | null
      gender: boolean | null
      DateOfBirth: Date | null
      phoneNumber: string | null
      createdAt: Date
      updatedAt: Date
      createdById: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends User$createdByArgs<ExtArgs> = {}>(args?: Subset<T, User$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdUsers<T extends User$createdUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$createdUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tournaments<T extends User$tournamentsArgs<ExtArgs> = {}>(args?: Subset<T, User$tournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scoredMatches<T extends User$scoredMatchesArgs<ExtArgs> = {}>(args?: Subset<T, User$scoredMatchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allianceRefFor<T extends User$allianceRefForArgs<ExtArgs> = {}>(args?: Subset<T, User$allianceRefForArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchReferees<T extends User$matchRefereesArgs<ExtArgs> = {}>(args?: Subset<T, User$matchRefereesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly email: FieldRef<"User", 'String'>
    readonly gender: FieldRef<"User", 'Boolean'>
    readonly DateOfBirth: FieldRef<"User", 'DateTime'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly createdById: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdBy
   */
  export type User$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.createdUsers
   */
  export type User$createdUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.tournaments
   */
  export type User$tournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    cursor?: TournamentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * User.scoredMatches
   */
  export type User$scoredMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * User.allianceRefFor
   */
  export type User$allianceRefForArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    where?: AllianceScoringWhereInput
    orderBy?: AllianceScoringOrderByWithRelationInput | AllianceScoringOrderByWithRelationInput[]
    cursor?: AllianceScoringWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AllianceScoringScalarFieldEnum | AllianceScoringScalarFieldEnum[]
  }

  /**
   * User.matchReferees
   */
  export type User$matchRefereesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    where?: MatchRefereeWhereInput
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    cursor?: MatchRefereeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchRefereeScalarFieldEnum | MatchRefereeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Tournament
   */

  export type AggregateTournament = {
    _count: TournamentCountAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  export type TournamentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: string | null
  }

  export type TournamentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    adminId: string | null
  }

  export type TournamentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    startDate: number
    endDate: number
    createdAt: number
    updatedAt: number
    adminId: number
    _all: number
  }


  export type TournamentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type TournamentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
  }

  export type TournamentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    createdAt?: true
    updatedAt?: true
    adminId?: true
    _all?: true
  }

  export type TournamentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournament to aggregate.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tournaments
    **/
    _count?: true | TournamentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMaxAggregateInputType
  }

  export type GetTournamentAggregateType<T extends TournamentAggregateArgs> = {
        [P in keyof T & keyof AggregateTournament]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournament[P]>
      : GetScalarType<T[P], AggregateTournament[P]>
  }




  export type TournamentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithAggregationInput | TournamentOrderByWithAggregationInput[]
    by: TournamentScalarFieldEnum[] | TournamentScalarFieldEnum
    having?: TournamentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentCountAggregateInputType | true
    _min?: TournamentMinAggregateInputType
    _max?: TournamentMaxAggregateInputType
  }

  export type TournamentGroupByOutputType = {
    id: string
    name: string
    description: string | null
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    adminId: string
    _count: TournamentCountAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  type GetTournamentGroupByPayload<T extends TournamentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentGroupByOutputType[P]>
        }
      >
    >


  export type TournamentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
    stages?: boolean | Tournament$stagesArgs<ExtArgs>
    teams?: boolean | Tournament$teamsArgs<ExtArgs>
    teamStats?: boolean | Tournament$teamStatsArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    adminId?: boolean
  }

  export type TournamentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "startDate" | "endDate" | "createdAt" | "updatedAt" | "adminId", ExtArgs["result"]["tournament"]>
  export type TournamentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
    stages?: boolean | Tournament$stagesArgs<ExtArgs>
    teams?: boolean | Tournament$teamsArgs<ExtArgs>
    teamStats?: boolean | Tournament$teamStatsArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TournamentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tournament"
    objects: {
      admin: Prisma.$UserPayload<ExtArgs>
      stages: Prisma.$StagePayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
      teamStats: Prisma.$TeamStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      startDate: Date
      endDate: Date
      createdAt: Date
      updatedAt: Date
      adminId: string
    }, ExtArgs["result"]["tournament"]>
    composites: {}
  }

  type TournamentGetPayload<S extends boolean | null | undefined | TournamentDefaultArgs> = $Result.GetResult<Prisma.$TournamentPayload, S>

  type TournamentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentCountAggregateInputType | true
    }

  export interface TournamentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tournament'], meta: { name: 'Tournament' } }
    /**
     * Find zero or one Tournament that matches the filter.
     * @param {TournamentFindUniqueArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentFindUniqueArgs>(args: SelectSubset<T, TournamentFindUniqueArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tournament that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentFindUniqueOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentFindFirstArgs>(args?: SelectSubset<T, TournamentFindFirstArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tournaments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tournaments
     * const tournaments = await prisma.tournament.findMany()
     * 
     * // Get first 10 Tournaments
     * const tournaments = await prisma.tournament.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentWithIdOnly = await prisma.tournament.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentFindManyArgs>(args?: SelectSubset<T, TournamentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tournament.
     * @param {TournamentCreateArgs} args - Arguments to create a Tournament.
     * @example
     * // Create one Tournament
     * const Tournament = await prisma.tournament.create({
     *   data: {
     *     // ... data to create a Tournament
     *   }
     * })
     * 
     */
    create<T extends TournamentCreateArgs>(args: SelectSubset<T, TournamentCreateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tournaments.
     * @param {TournamentCreateManyArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentCreateManyArgs>(args?: SelectSubset<T, TournamentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tournaments and returns the data saved in the database.
     * @param {TournamentCreateManyAndReturnArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tournament.
     * @param {TournamentDeleteArgs} args - Arguments to delete one Tournament.
     * @example
     * // Delete one Tournament
     * const Tournament = await prisma.tournament.delete({
     *   where: {
     *     // ... filter to delete one Tournament
     *   }
     * })
     * 
     */
    delete<T extends TournamentDeleteArgs>(args: SelectSubset<T, TournamentDeleteArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tournament.
     * @param {TournamentUpdateArgs} args - Arguments to update one Tournament.
     * @example
     * // Update one Tournament
     * const tournament = await prisma.tournament.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentUpdateArgs>(args: SelectSubset<T, TournamentUpdateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tournaments.
     * @param {TournamentDeleteManyArgs} args - Arguments to filter Tournaments to delete.
     * @example
     * // Delete a few Tournaments
     * const { count } = await prisma.tournament.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentDeleteManyArgs>(args?: SelectSubset<T, TournamentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentUpdateManyArgs>(args: SelectSubset<T, TournamentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments and returns the data updated in the database.
     * @param {TournamentUpdateManyAndReturnArgs} args - Arguments to update many Tournaments.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TournamentUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tournament.
     * @param {TournamentUpsertArgs} args - Arguments to update or create a Tournament.
     * @example
     * // Update or create a Tournament
     * const tournament = await prisma.tournament.upsert({
     *   create: {
     *     // ... data to create a Tournament
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tournament we want to update
     *   }
     * })
     */
    upsert<T extends TournamentUpsertArgs>(args: SelectSubset<T, TournamentUpsertArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentCountArgs} args - Arguments to filter Tournaments to count.
     * @example
     * // Count the number of Tournaments
     * const count = await prisma.tournament.count({
     *   where: {
     *     // ... the filter for the Tournaments we want to count
     *   }
     * })
    **/
    count<T extends TournamentCountArgs>(
      args?: Subset<T, TournamentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TournamentAggregateArgs>(args: Subset<T, TournamentAggregateArgs>): Prisma.PrismaPromise<GetTournamentAggregateType<T>>

    /**
     * Group by Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TournamentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentGroupByArgs['orderBy'] }
        : { orderBy?: TournamentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TournamentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tournament model
   */
  readonly fields: TournamentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tournament.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stages<T extends Tournament$stagesArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$stagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends Tournament$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamStats<T extends Tournament$teamStatsArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$teamStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tournament model
   */
  interface TournamentFieldRefs {
    readonly id: FieldRef<"Tournament", 'String'>
    readonly name: FieldRef<"Tournament", 'String'>
    readonly description: FieldRef<"Tournament", 'String'>
    readonly startDate: FieldRef<"Tournament", 'DateTime'>
    readonly endDate: FieldRef<"Tournament", 'DateTime'>
    readonly createdAt: FieldRef<"Tournament", 'DateTime'>
    readonly updatedAt: FieldRef<"Tournament", 'DateTime'>
    readonly adminId: FieldRef<"Tournament", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tournament findUnique
   */
  export type TournamentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findUniqueOrThrow
   */
  export type TournamentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findFirst
   */
  export type TournamentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findFirstOrThrow
   */
  export type TournamentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findMany
   */
  export type TournamentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournaments to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament create
   */
  export type TournamentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to create a Tournament.
     */
    data: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
  }

  /**
   * Tournament createMany
   */
  export type TournamentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tournament createManyAndReturn
   */
  export type TournamentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament update
   */
  export type TournamentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to update a Tournament.
     */
    data: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
    /**
     * Choose, which Tournament to update.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament updateMany
   */
  export type TournamentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
  }

  /**
   * Tournament updateManyAndReturn
   */
  export type TournamentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament upsert
   */
  export type TournamentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The filter to search for the Tournament to update in case it exists.
     */
    where: TournamentWhereUniqueInput
    /**
     * In case the Tournament found by the `where` argument doesn't exist, create a new Tournament with this data.
     */
    create: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
    /**
     * In case the Tournament was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
  }

  /**
   * Tournament delete
   */
  export type TournamentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter which Tournament to delete.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament deleteMany
   */
  export type TournamentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournaments to delete
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to delete.
     */
    limit?: number
  }

  /**
   * Tournament.stages
   */
  export type Tournament$stagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    where?: StageWhereInput
    orderBy?: StageOrderByWithRelationInput | StageOrderByWithRelationInput[]
    cursor?: StageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StageScalarFieldEnum | StageScalarFieldEnum[]
  }

  /**
   * Tournament.teams
   */
  export type Tournament$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Tournament.teamStats
   */
  export type Tournament$teamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    where?: TeamStatsWhereInput
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    cursor?: TeamStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * Tournament without action
   */
  export type TournamentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
  }


  /**
   * Model Stage
   */

  export type AggregateStage = {
    _count: StageCountAggregateOutputType | null
    _min: StageMinAggregateOutputType | null
    _max: StageMaxAggregateOutputType | null
  }

  export type StageMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.StageType | null
    startDate: Date | null
    endDate: Date | null
    tournamentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.StageType | null
    startDate: Date | null
    endDate: Date | null
    tournamentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StageCountAggregateOutputType = {
    id: number
    name: number
    type: number
    startDate: number
    endDate: number
    tournamentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StageMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    startDate?: true
    endDate?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StageMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    startDate?: true
    endDate?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StageCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    startDate?: true
    endDate?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stage to aggregate.
     */
    where?: StageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stages to fetch.
     */
    orderBy?: StageOrderByWithRelationInput | StageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stages
    **/
    _count?: true | StageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StageMaxAggregateInputType
  }

  export type GetStageAggregateType<T extends StageAggregateArgs> = {
        [P in keyof T & keyof AggregateStage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStage[P]>
      : GetScalarType<T[P], AggregateStage[P]>
  }




  export type StageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StageWhereInput
    orderBy?: StageOrderByWithAggregationInput | StageOrderByWithAggregationInput[]
    by: StageScalarFieldEnum[] | StageScalarFieldEnum
    having?: StageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StageCountAggregateInputType | true
    _min?: StageMinAggregateInputType
    _max?: StageMaxAggregateInputType
  }

  export type StageGroupByOutputType = {
    id: string
    name: string
    type: $Enums.StageType
    startDate: Date
    endDate: Date
    tournamentId: string
    createdAt: Date
    updatedAt: Date
    _count: StageCountAggregateOutputType | null
    _min: StageMinAggregateOutputType | null
    _max: StageMaxAggregateOutputType | null
  }

  type GetStageGroupByPayload<T extends StageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StageGroupByOutputType[P]>
            : GetScalarType<T[P], StageGroupByOutputType[P]>
        }
      >
    >


  export type StageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    matches?: boolean | Stage$matchesArgs<ExtArgs>
    teamStats?: boolean | Stage$teamStatsArgs<ExtArgs>
    _count?: boolean | StageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stage"]>

  export type StageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stage"]>

  export type StageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stage"]>

  export type StageSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    startDate?: boolean
    endDate?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "startDate" | "endDate" | "tournamentId" | "createdAt" | "updatedAt", ExtArgs["result"]["stage"]>
  export type StageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    matches?: boolean | Stage$matchesArgs<ExtArgs>
    teamStats?: boolean | Stage$teamStatsArgs<ExtArgs>
    _count?: boolean | StageCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type StageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }

  export type $StagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stage"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      matches: Prisma.$MatchPayload<ExtArgs>[]
      teamStats: Prisma.$TeamStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.StageType
      startDate: Date
      endDate: Date
      tournamentId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stage"]>
    composites: {}
  }

  type StageGetPayload<S extends boolean | null | undefined | StageDefaultArgs> = $Result.GetResult<Prisma.$StagePayload, S>

  type StageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StageCountAggregateInputType | true
    }

  export interface StageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stage'], meta: { name: 'Stage' } }
    /**
     * Find zero or one Stage that matches the filter.
     * @param {StageFindUniqueArgs} args - Arguments to find a Stage
     * @example
     * // Get one Stage
     * const stage = await prisma.stage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StageFindUniqueArgs>(args: SelectSubset<T, StageFindUniqueArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StageFindUniqueOrThrowArgs} args - Arguments to find a Stage
     * @example
     * // Get one Stage
     * const stage = await prisma.stage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StageFindUniqueOrThrowArgs>(args: SelectSubset<T, StageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageFindFirstArgs} args - Arguments to find a Stage
     * @example
     * // Get one Stage
     * const stage = await prisma.stage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StageFindFirstArgs>(args?: SelectSubset<T, StageFindFirstArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageFindFirstOrThrowArgs} args - Arguments to find a Stage
     * @example
     * // Get one Stage
     * const stage = await prisma.stage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StageFindFirstOrThrowArgs>(args?: SelectSubset<T, StageFindFirstOrThrowArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stages
     * const stages = await prisma.stage.findMany()
     * 
     * // Get first 10 Stages
     * const stages = await prisma.stage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stageWithIdOnly = await prisma.stage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StageFindManyArgs>(args?: SelectSubset<T, StageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stage.
     * @param {StageCreateArgs} args - Arguments to create a Stage.
     * @example
     * // Create one Stage
     * const Stage = await prisma.stage.create({
     *   data: {
     *     // ... data to create a Stage
     *   }
     * })
     * 
     */
    create<T extends StageCreateArgs>(args: SelectSubset<T, StageCreateArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stages.
     * @param {StageCreateManyArgs} args - Arguments to create many Stages.
     * @example
     * // Create many Stages
     * const stage = await prisma.stage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StageCreateManyArgs>(args?: SelectSubset<T, StageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stages and returns the data saved in the database.
     * @param {StageCreateManyAndReturnArgs} args - Arguments to create many Stages.
     * @example
     * // Create many Stages
     * const stage = await prisma.stage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stages and only return the `id`
     * const stageWithIdOnly = await prisma.stage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StageCreateManyAndReturnArgs>(args?: SelectSubset<T, StageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stage.
     * @param {StageDeleteArgs} args - Arguments to delete one Stage.
     * @example
     * // Delete one Stage
     * const Stage = await prisma.stage.delete({
     *   where: {
     *     // ... filter to delete one Stage
     *   }
     * })
     * 
     */
    delete<T extends StageDeleteArgs>(args: SelectSubset<T, StageDeleteArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stage.
     * @param {StageUpdateArgs} args - Arguments to update one Stage.
     * @example
     * // Update one Stage
     * const stage = await prisma.stage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StageUpdateArgs>(args: SelectSubset<T, StageUpdateArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stages.
     * @param {StageDeleteManyArgs} args - Arguments to filter Stages to delete.
     * @example
     * // Delete a few Stages
     * const { count } = await prisma.stage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StageDeleteManyArgs>(args?: SelectSubset<T, StageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stages
     * const stage = await prisma.stage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StageUpdateManyArgs>(args: SelectSubset<T, StageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stages and returns the data updated in the database.
     * @param {StageUpdateManyAndReturnArgs} args - Arguments to update many Stages.
     * @example
     * // Update many Stages
     * const stage = await prisma.stage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stages and only return the `id`
     * const stageWithIdOnly = await prisma.stage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StageUpdateManyAndReturnArgs>(args: SelectSubset<T, StageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stage.
     * @param {StageUpsertArgs} args - Arguments to update or create a Stage.
     * @example
     * // Update or create a Stage
     * const stage = await prisma.stage.upsert({
     *   create: {
     *     // ... data to create a Stage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stage we want to update
     *   }
     * })
     */
    upsert<T extends StageUpsertArgs>(args: SelectSubset<T, StageUpsertArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageCountArgs} args - Arguments to filter Stages to count.
     * @example
     * // Count the number of Stages
     * const count = await prisma.stage.count({
     *   where: {
     *     // ... the filter for the Stages we want to count
     *   }
     * })
    **/
    count<T extends StageCountArgs>(
      args?: Subset<T, StageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StageAggregateArgs>(args: Subset<T, StageAggregateArgs>): Prisma.PrismaPromise<GetStageAggregateType<T>>

    /**
     * Group by Stage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StageGroupByArgs['orderBy'] }
        : { orderBy?: StageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stage model
   */
  readonly fields: StageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    matches<T extends Stage$matchesArgs<ExtArgs> = {}>(args?: Subset<T, Stage$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamStats<T extends Stage$teamStatsArgs<ExtArgs> = {}>(args?: Subset<T, Stage$teamStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stage model
   */
  interface StageFieldRefs {
    readonly id: FieldRef<"Stage", 'String'>
    readonly name: FieldRef<"Stage", 'String'>
    readonly type: FieldRef<"Stage", 'StageType'>
    readonly startDate: FieldRef<"Stage", 'DateTime'>
    readonly endDate: FieldRef<"Stage", 'DateTime'>
    readonly tournamentId: FieldRef<"Stage", 'String'>
    readonly createdAt: FieldRef<"Stage", 'DateTime'>
    readonly updatedAt: FieldRef<"Stage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stage findUnique
   */
  export type StageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter, which Stage to fetch.
     */
    where: StageWhereUniqueInput
  }

  /**
   * Stage findUniqueOrThrow
   */
  export type StageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter, which Stage to fetch.
     */
    where: StageWhereUniqueInput
  }

  /**
   * Stage findFirst
   */
  export type StageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter, which Stage to fetch.
     */
    where?: StageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stages to fetch.
     */
    orderBy?: StageOrderByWithRelationInput | StageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stages.
     */
    cursor?: StageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stages.
     */
    distinct?: StageScalarFieldEnum | StageScalarFieldEnum[]
  }

  /**
   * Stage findFirstOrThrow
   */
  export type StageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter, which Stage to fetch.
     */
    where?: StageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stages to fetch.
     */
    orderBy?: StageOrderByWithRelationInput | StageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stages.
     */
    cursor?: StageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stages.
     */
    distinct?: StageScalarFieldEnum | StageScalarFieldEnum[]
  }

  /**
   * Stage findMany
   */
  export type StageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter, which Stages to fetch.
     */
    where?: StageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stages to fetch.
     */
    orderBy?: StageOrderByWithRelationInput | StageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stages.
     */
    cursor?: StageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stages.
     */
    skip?: number
    distinct?: StageScalarFieldEnum | StageScalarFieldEnum[]
  }

  /**
   * Stage create
   */
  export type StageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * The data needed to create a Stage.
     */
    data: XOR<StageCreateInput, StageUncheckedCreateInput>
  }

  /**
   * Stage createMany
   */
  export type StageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stages.
     */
    data: StageCreateManyInput | StageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stage createManyAndReturn
   */
  export type StageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * The data used to create many Stages.
     */
    data: StageCreateManyInput | StageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stage update
   */
  export type StageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * The data needed to update a Stage.
     */
    data: XOR<StageUpdateInput, StageUncheckedUpdateInput>
    /**
     * Choose, which Stage to update.
     */
    where: StageWhereUniqueInput
  }

  /**
   * Stage updateMany
   */
  export type StageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stages.
     */
    data: XOR<StageUpdateManyMutationInput, StageUncheckedUpdateManyInput>
    /**
     * Filter which Stages to update
     */
    where?: StageWhereInput
    /**
     * Limit how many Stages to update.
     */
    limit?: number
  }

  /**
   * Stage updateManyAndReturn
   */
  export type StageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * The data used to update Stages.
     */
    data: XOR<StageUpdateManyMutationInput, StageUncheckedUpdateManyInput>
    /**
     * Filter which Stages to update
     */
    where?: StageWhereInput
    /**
     * Limit how many Stages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stage upsert
   */
  export type StageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * The filter to search for the Stage to update in case it exists.
     */
    where: StageWhereUniqueInput
    /**
     * In case the Stage found by the `where` argument doesn't exist, create a new Stage with this data.
     */
    create: XOR<StageCreateInput, StageUncheckedCreateInput>
    /**
     * In case the Stage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StageUpdateInput, StageUncheckedUpdateInput>
  }

  /**
   * Stage delete
   */
  export type StageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    /**
     * Filter which Stage to delete.
     */
    where: StageWhereUniqueInput
  }

  /**
   * Stage deleteMany
   */
  export type StageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stages to delete
     */
    where?: StageWhereInput
    /**
     * Limit how many Stages to delete.
     */
    limit?: number
  }

  /**
   * Stage.matches
   */
  export type Stage$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Stage.teamStats
   */
  export type Stage$teamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    where?: TeamStatsWhereInput
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    cursor?: TeamStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * Stage without action
   */
  export type StageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    matchNumber: number | null
    roundNumber: number | null
    duration: number | null
  }

  export type MatchSumAggregateOutputType = {
    matchNumber: number | null
    roundNumber: number | null
    duration: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: string | null
    matchNumber: number | null
    roundNumber: number | null
    status: string | null
    startTime: Date | null
    scheduledTime: Date | null
    endTime: Date | null
    duration: number | null
    winningAlliance: string | null
    stageId: string | null
    scoredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: string | null
    matchNumber: number | null
    roundNumber: number | null
    status: string | null
    startTime: Date | null
    scheduledTime: Date | null
    endTime: Date | null
    duration: number | null
    winningAlliance: string | null
    stageId: string | null
    scoredById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    matchNumber: number
    roundNumber: number
    status: number
    startTime: number
    scheduledTime: number
    endTime: number
    duration: number
    winningAlliance: number
    stageId: number
    scoredById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    matchNumber?: true
    roundNumber?: true
    duration?: true
  }

  export type MatchSumAggregateInputType = {
    matchNumber?: true
    roundNumber?: true
    duration?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    matchNumber?: true
    roundNumber?: true
    status?: true
    startTime?: true
    scheduledTime?: true
    endTime?: true
    duration?: true
    winningAlliance?: true
    stageId?: true
    scoredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    matchNumber?: true
    roundNumber?: true
    status?: true
    startTime?: true
    scheduledTime?: true
    endTime?: true
    duration?: true
    winningAlliance?: true
    stageId?: true
    scoredById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    matchNumber?: true
    roundNumber?: true
    status?: true
    startTime?: true
    scheduledTime?: true
    endTime?: true
    duration?: true
    winningAlliance?: true
    stageId?: true
    scoredById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: string
    matchNumber: number
    roundNumber: number | null
    status: string
    startTime: Date | null
    scheduledTime: Date | null
    endTime: Date | null
    duration: number | null
    winningAlliance: string | null
    stageId: string
    scoredById: string | null
    createdAt: Date
    updatedAt: Date
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchNumber?: boolean
    roundNumber?: boolean
    status?: boolean
    startTime?: boolean
    scheduledTime?: boolean
    endTime?: boolean
    duration?: boolean
    winningAlliance?: boolean
    stageId?: boolean
    scoredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stage?: boolean | StageDefaultArgs<ExtArgs>
    alliances?: boolean | Match$alliancesArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
    referees?: boolean | Match$refereesArgs<ExtArgs>
    matchScores?: boolean | Match$matchScoresArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchNumber?: boolean
    roundNumber?: boolean
    status?: boolean
    startTime?: boolean
    scheduledTime?: boolean
    endTime?: boolean
    duration?: boolean
    winningAlliance?: boolean
    stageId?: boolean
    scoredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stage?: boolean | StageDefaultArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchNumber?: boolean
    roundNumber?: boolean
    status?: boolean
    startTime?: boolean
    scheduledTime?: boolean
    endTime?: boolean
    duration?: boolean
    winningAlliance?: boolean
    stageId?: boolean
    scoredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stage?: boolean | StageDefaultArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    matchNumber?: boolean
    roundNumber?: boolean
    status?: boolean
    startTime?: boolean
    scheduledTime?: boolean
    endTime?: boolean
    duration?: boolean
    winningAlliance?: boolean
    stageId?: boolean
    scoredById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchNumber" | "roundNumber" | "status" | "startTime" | "scheduledTime" | "endTime" | "duration" | "winningAlliance" | "stageId" | "scoredById" | "createdAt" | "updatedAt", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stage?: boolean | StageDefaultArgs<ExtArgs>
    alliances?: boolean | Match$alliancesArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
    referees?: boolean | Match$refereesArgs<ExtArgs>
    matchScores?: boolean | Match$matchScoresArgs<ExtArgs>
    _count?: boolean | MatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stage?: boolean | StageDefaultArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
  }
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stage?: boolean | StageDefaultArgs<ExtArgs>
    scoredBy?: boolean | Match$scoredByArgs<ExtArgs>
  }

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      stage: Prisma.$StagePayload<ExtArgs>
      alliances: Prisma.$AlliancePayload<ExtArgs>[]
      scoredBy: Prisma.$UserPayload<ExtArgs> | null
      referees: Prisma.$MatchRefereePayload<ExtArgs>[]
      matchScores: Prisma.$MatchScoresPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchNumber: number
      roundNumber: number | null
      status: string
      startTime: Date | null
      scheduledTime: Date | null
      endTime: Date | null
      duration: number | null
      winningAlliance: string | null
      stageId: string
      scoredById: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stage<T extends StageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StageDefaultArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    alliances<T extends Match$alliancesArgs<ExtArgs> = {}>(args?: Subset<T, Match$alliancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scoredBy<T extends Match$scoredByArgs<ExtArgs> = {}>(args?: Subset<T, Match$scoredByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    referees<T extends Match$refereesArgs<ExtArgs> = {}>(args?: Subset<T, Match$refereesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchScores<T extends Match$matchScoresArgs<ExtArgs> = {}>(args?: Subset<T, Match$matchScoresArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'String'>
    readonly matchNumber: FieldRef<"Match", 'Int'>
    readonly roundNumber: FieldRef<"Match", 'Int'>
    readonly status: FieldRef<"Match", 'String'>
    readonly startTime: FieldRef<"Match", 'DateTime'>
    readonly scheduledTime: FieldRef<"Match", 'DateTime'>
    readonly endTime: FieldRef<"Match", 'DateTime'>
    readonly duration: FieldRef<"Match", 'Int'>
    readonly winningAlliance: FieldRef<"Match", 'String'>
    readonly stageId: FieldRef<"Match", 'String'>
    readonly scoredById: FieldRef<"Match", 'String'>
    readonly createdAt: FieldRef<"Match", 'DateTime'>
    readonly updatedAt: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match.alliances
   */
  export type Match$alliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    where?: AllianceWhereInput
    orderBy?: AllianceOrderByWithRelationInput | AllianceOrderByWithRelationInput[]
    cursor?: AllianceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AllianceScalarFieldEnum | AllianceScalarFieldEnum[]
  }

  /**
   * Match.scoredBy
   */
  export type Match$scoredByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Match.referees
   */
  export type Match$refereesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    where?: MatchRefereeWhereInput
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    cursor?: MatchRefereeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchRefereeScalarFieldEnum | MatchRefereeScalarFieldEnum[]
  }

  /**
   * Match.matchScores
   */
  export type Match$matchScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    where?: MatchScoresWhereInput
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Model MatchReferee
   */

  export type AggregateMatchReferee = {
    _count: MatchRefereeCountAggregateOutputType | null
    _min: MatchRefereeMinAggregateOutputType | null
    _max: MatchRefereeMaxAggregateOutputType | null
  }

  export type MatchRefereeMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    role: $Enums.RefereeRole | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchRefereeMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    userId: string | null
    role: $Enums.RefereeRole | null
    position: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchRefereeCountAggregateOutputType = {
    id: number
    matchId: number
    userId: number
    role: number
    position: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MatchRefereeMinAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    role?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchRefereeMaxAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    role?: true
    position?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchRefereeCountAggregateInputType = {
    id?: true
    matchId?: true
    userId?: true
    role?: true
    position?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MatchRefereeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchReferee to aggregate.
     */
    where?: MatchRefereeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchReferees to fetch.
     */
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchRefereeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchReferees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchReferees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchReferees
    **/
    _count?: true | MatchRefereeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchRefereeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchRefereeMaxAggregateInputType
  }

  export type GetMatchRefereeAggregateType<T extends MatchRefereeAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchReferee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchReferee[P]>
      : GetScalarType<T[P], AggregateMatchReferee[P]>
  }




  export type MatchRefereeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchRefereeWhereInput
    orderBy?: MatchRefereeOrderByWithAggregationInput | MatchRefereeOrderByWithAggregationInput[]
    by: MatchRefereeScalarFieldEnum[] | MatchRefereeScalarFieldEnum
    having?: MatchRefereeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchRefereeCountAggregateInputType | true
    _min?: MatchRefereeMinAggregateInputType
    _max?: MatchRefereeMaxAggregateInputType
  }

  export type MatchRefereeGroupByOutputType = {
    id: string
    matchId: string
    userId: string
    role: $Enums.RefereeRole
    position: string | null
    createdAt: Date
    updatedAt: Date
    _count: MatchRefereeCountAggregateOutputType | null
    _min: MatchRefereeMinAggregateOutputType | null
    _max: MatchRefereeMaxAggregateOutputType | null
  }

  type GetMatchRefereeGroupByPayload<T extends MatchRefereeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchRefereeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchRefereeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchRefereeGroupByOutputType[P]>
            : GetScalarType<T[P], MatchRefereeGroupByOutputType[P]>
        }
      >
    >


  export type MatchRefereeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    role?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchReferee"]>

  export type MatchRefereeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    role?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchReferee"]>

  export type MatchRefereeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    userId?: boolean
    role?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchReferee"]>

  export type MatchRefereeSelectScalar = {
    id?: boolean
    matchId?: boolean
    userId?: boolean
    role?: boolean
    position?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MatchRefereeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "userId" | "role" | "position" | "createdAt" | "updatedAt", ExtArgs["result"]["matchReferee"]>
  export type MatchRefereeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MatchRefereeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MatchRefereeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MatchRefereePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchReferee"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      userId: string
      role: $Enums.RefereeRole
      position: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["matchReferee"]>
    composites: {}
  }

  type MatchRefereeGetPayload<S extends boolean | null | undefined | MatchRefereeDefaultArgs> = $Result.GetResult<Prisma.$MatchRefereePayload, S>

  type MatchRefereeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchRefereeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchRefereeCountAggregateInputType | true
    }

  export interface MatchRefereeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchReferee'], meta: { name: 'MatchReferee' } }
    /**
     * Find zero or one MatchReferee that matches the filter.
     * @param {MatchRefereeFindUniqueArgs} args - Arguments to find a MatchReferee
     * @example
     * // Get one MatchReferee
     * const matchReferee = await prisma.matchReferee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchRefereeFindUniqueArgs>(args: SelectSubset<T, MatchRefereeFindUniqueArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchReferee that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchRefereeFindUniqueOrThrowArgs} args - Arguments to find a MatchReferee
     * @example
     * // Get one MatchReferee
     * const matchReferee = await prisma.matchReferee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchRefereeFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchRefereeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchReferee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeFindFirstArgs} args - Arguments to find a MatchReferee
     * @example
     * // Get one MatchReferee
     * const matchReferee = await prisma.matchReferee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchRefereeFindFirstArgs>(args?: SelectSubset<T, MatchRefereeFindFirstArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchReferee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeFindFirstOrThrowArgs} args - Arguments to find a MatchReferee
     * @example
     * // Get one MatchReferee
     * const matchReferee = await prisma.matchReferee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchRefereeFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchRefereeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchReferees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchReferees
     * const matchReferees = await prisma.matchReferee.findMany()
     * 
     * // Get first 10 MatchReferees
     * const matchReferees = await prisma.matchReferee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchRefereeWithIdOnly = await prisma.matchReferee.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchRefereeFindManyArgs>(args?: SelectSubset<T, MatchRefereeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchReferee.
     * @param {MatchRefereeCreateArgs} args - Arguments to create a MatchReferee.
     * @example
     * // Create one MatchReferee
     * const MatchReferee = await prisma.matchReferee.create({
     *   data: {
     *     // ... data to create a MatchReferee
     *   }
     * })
     * 
     */
    create<T extends MatchRefereeCreateArgs>(args: SelectSubset<T, MatchRefereeCreateArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchReferees.
     * @param {MatchRefereeCreateManyArgs} args - Arguments to create many MatchReferees.
     * @example
     * // Create many MatchReferees
     * const matchReferee = await prisma.matchReferee.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchRefereeCreateManyArgs>(args?: SelectSubset<T, MatchRefereeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchReferees and returns the data saved in the database.
     * @param {MatchRefereeCreateManyAndReturnArgs} args - Arguments to create many MatchReferees.
     * @example
     * // Create many MatchReferees
     * const matchReferee = await prisma.matchReferee.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchReferees and only return the `id`
     * const matchRefereeWithIdOnly = await prisma.matchReferee.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchRefereeCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchRefereeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchReferee.
     * @param {MatchRefereeDeleteArgs} args - Arguments to delete one MatchReferee.
     * @example
     * // Delete one MatchReferee
     * const MatchReferee = await prisma.matchReferee.delete({
     *   where: {
     *     // ... filter to delete one MatchReferee
     *   }
     * })
     * 
     */
    delete<T extends MatchRefereeDeleteArgs>(args: SelectSubset<T, MatchRefereeDeleteArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchReferee.
     * @param {MatchRefereeUpdateArgs} args - Arguments to update one MatchReferee.
     * @example
     * // Update one MatchReferee
     * const matchReferee = await prisma.matchReferee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchRefereeUpdateArgs>(args: SelectSubset<T, MatchRefereeUpdateArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchReferees.
     * @param {MatchRefereeDeleteManyArgs} args - Arguments to filter MatchReferees to delete.
     * @example
     * // Delete a few MatchReferees
     * const { count } = await prisma.matchReferee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchRefereeDeleteManyArgs>(args?: SelectSubset<T, MatchRefereeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchReferees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchReferees
     * const matchReferee = await prisma.matchReferee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchRefereeUpdateManyArgs>(args: SelectSubset<T, MatchRefereeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchReferees and returns the data updated in the database.
     * @param {MatchRefereeUpdateManyAndReturnArgs} args - Arguments to update many MatchReferees.
     * @example
     * // Update many MatchReferees
     * const matchReferee = await prisma.matchReferee.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchReferees and only return the `id`
     * const matchRefereeWithIdOnly = await prisma.matchReferee.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchRefereeUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchRefereeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchReferee.
     * @param {MatchRefereeUpsertArgs} args - Arguments to update or create a MatchReferee.
     * @example
     * // Update or create a MatchReferee
     * const matchReferee = await prisma.matchReferee.upsert({
     *   create: {
     *     // ... data to create a MatchReferee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchReferee we want to update
     *   }
     * })
     */
    upsert<T extends MatchRefereeUpsertArgs>(args: SelectSubset<T, MatchRefereeUpsertArgs<ExtArgs>>): Prisma__MatchRefereeClient<$Result.GetResult<Prisma.$MatchRefereePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchReferees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeCountArgs} args - Arguments to filter MatchReferees to count.
     * @example
     * // Count the number of MatchReferees
     * const count = await prisma.matchReferee.count({
     *   where: {
     *     // ... the filter for the MatchReferees we want to count
     *   }
     * })
    **/
    count<T extends MatchRefereeCountArgs>(
      args?: Subset<T, MatchRefereeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchRefereeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchReferee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchRefereeAggregateArgs>(args: Subset<T, MatchRefereeAggregateArgs>): Prisma.PrismaPromise<GetMatchRefereeAggregateType<T>>

    /**
     * Group by MatchReferee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchRefereeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchRefereeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchRefereeGroupByArgs['orderBy'] }
        : { orderBy?: MatchRefereeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchRefereeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchRefereeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchReferee model
   */
  readonly fields: MatchRefereeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchReferee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchRefereeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchReferee model
   */
  interface MatchRefereeFieldRefs {
    readonly id: FieldRef<"MatchReferee", 'String'>
    readonly matchId: FieldRef<"MatchReferee", 'String'>
    readonly userId: FieldRef<"MatchReferee", 'String'>
    readonly role: FieldRef<"MatchReferee", 'RefereeRole'>
    readonly position: FieldRef<"MatchReferee", 'String'>
    readonly createdAt: FieldRef<"MatchReferee", 'DateTime'>
    readonly updatedAt: FieldRef<"MatchReferee", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchReferee findUnique
   */
  export type MatchRefereeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter, which MatchReferee to fetch.
     */
    where: MatchRefereeWhereUniqueInput
  }

  /**
   * MatchReferee findUniqueOrThrow
   */
  export type MatchRefereeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter, which MatchReferee to fetch.
     */
    where: MatchRefereeWhereUniqueInput
  }

  /**
   * MatchReferee findFirst
   */
  export type MatchRefereeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter, which MatchReferee to fetch.
     */
    where?: MatchRefereeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchReferees to fetch.
     */
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchReferees.
     */
    cursor?: MatchRefereeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchReferees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchReferees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchReferees.
     */
    distinct?: MatchRefereeScalarFieldEnum | MatchRefereeScalarFieldEnum[]
  }

  /**
   * MatchReferee findFirstOrThrow
   */
  export type MatchRefereeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter, which MatchReferee to fetch.
     */
    where?: MatchRefereeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchReferees to fetch.
     */
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchReferees.
     */
    cursor?: MatchRefereeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchReferees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchReferees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchReferees.
     */
    distinct?: MatchRefereeScalarFieldEnum | MatchRefereeScalarFieldEnum[]
  }

  /**
   * MatchReferee findMany
   */
  export type MatchRefereeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter, which MatchReferees to fetch.
     */
    where?: MatchRefereeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchReferees to fetch.
     */
    orderBy?: MatchRefereeOrderByWithRelationInput | MatchRefereeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchReferees.
     */
    cursor?: MatchRefereeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchReferees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchReferees.
     */
    skip?: number
    distinct?: MatchRefereeScalarFieldEnum | MatchRefereeScalarFieldEnum[]
  }

  /**
   * MatchReferee create
   */
  export type MatchRefereeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchReferee.
     */
    data: XOR<MatchRefereeCreateInput, MatchRefereeUncheckedCreateInput>
  }

  /**
   * MatchReferee createMany
   */
  export type MatchRefereeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchReferees.
     */
    data: MatchRefereeCreateManyInput | MatchRefereeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchReferee createManyAndReturn
   */
  export type MatchRefereeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * The data used to create many MatchReferees.
     */
    data: MatchRefereeCreateManyInput | MatchRefereeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchReferee update
   */
  export type MatchRefereeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchReferee.
     */
    data: XOR<MatchRefereeUpdateInput, MatchRefereeUncheckedUpdateInput>
    /**
     * Choose, which MatchReferee to update.
     */
    where: MatchRefereeWhereUniqueInput
  }

  /**
   * MatchReferee updateMany
   */
  export type MatchRefereeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchReferees.
     */
    data: XOR<MatchRefereeUpdateManyMutationInput, MatchRefereeUncheckedUpdateManyInput>
    /**
     * Filter which MatchReferees to update
     */
    where?: MatchRefereeWhereInput
    /**
     * Limit how many MatchReferees to update.
     */
    limit?: number
  }

  /**
   * MatchReferee updateManyAndReturn
   */
  export type MatchRefereeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * The data used to update MatchReferees.
     */
    data: XOR<MatchRefereeUpdateManyMutationInput, MatchRefereeUncheckedUpdateManyInput>
    /**
     * Filter which MatchReferees to update
     */
    where?: MatchRefereeWhereInput
    /**
     * Limit how many MatchReferees to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchReferee upsert
   */
  export type MatchRefereeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchReferee to update in case it exists.
     */
    where: MatchRefereeWhereUniqueInput
    /**
     * In case the MatchReferee found by the `where` argument doesn't exist, create a new MatchReferee with this data.
     */
    create: XOR<MatchRefereeCreateInput, MatchRefereeUncheckedCreateInput>
    /**
     * In case the MatchReferee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchRefereeUpdateInput, MatchRefereeUncheckedUpdateInput>
  }

  /**
   * MatchReferee delete
   */
  export type MatchRefereeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
    /**
     * Filter which MatchReferee to delete.
     */
    where: MatchRefereeWhereUniqueInput
  }

  /**
   * MatchReferee deleteMany
   */
  export type MatchRefereeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchReferees to delete
     */
    where?: MatchRefereeWhereInput
    /**
     * Limit how many MatchReferees to delete.
     */
    limit?: number
  }

  /**
   * MatchReferee without action
   */
  export type MatchRefereeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchReferee
     */
    select?: MatchRefereeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchReferee
     */
    omit?: MatchRefereeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchRefereeInclude<ExtArgs> | null
  }


  /**
   * Model Alliance
   */

  export type AggregateAlliance = {
    _count: AllianceCountAggregateOutputType | null
    _avg: AllianceAvgAggregateOutputType | null
    _sum: AllianceSumAggregateOutputType | null
    _min: AllianceMinAggregateOutputType | null
    _max: AllianceMaxAggregateOutputType | null
  }

  export type AllianceAvgAggregateOutputType = {
    score: number | null
  }

  export type AllianceSumAggregateOutputType = {
    score: number | null
  }

  export type AllianceMinAggregateOutputType = {
    id: string | null
    color: string | null
    score: number | null
    matchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllianceMaxAggregateOutputType = {
    id: string | null
    color: string | null
    score: number | null
    matchId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllianceCountAggregateOutputType = {
    id: number
    color: number
    score: number
    matchId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AllianceAvgAggregateInputType = {
    score?: true
  }

  export type AllianceSumAggregateInputType = {
    score?: true
  }

  export type AllianceMinAggregateInputType = {
    id?: true
    color?: true
    score?: true
    matchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllianceMaxAggregateInputType = {
    id?: true
    color?: true
    score?: true
    matchId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllianceCountAggregateInputType = {
    id?: true
    color?: true
    score?: true
    matchId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AllianceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alliance to aggregate.
     */
    where?: AllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alliances to fetch.
     */
    orderBy?: AllianceOrderByWithRelationInput | AllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alliances
    **/
    _count?: true | AllianceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AllianceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AllianceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AllianceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AllianceMaxAggregateInputType
  }

  export type GetAllianceAggregateType<T extends AllianceAggregateArgs> = {
        [P in keyof T & keyof AggregateAlliance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlliance[P]>
      : GetScalarType<T[P], AggregateAlliance[P]>
  }




  export type AllianceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllianceWhereInput
    orderBy?: AllianceOrderByWithAggregationInput | AllianceOrderByWithAggregationInput[]
    by: AllianceScalarFieldEnum[] | AllianceScalarFieldEnum
    having?: AllianceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AllianceCountAggregateInputType | true
    _avg?: AllianceAvgAggregateInputType
    _sum?: AllianceSumAggregateInputType
    _min?: AllianceMinAggregateInputType
    _max?: AllianceMaxAggregateInputType
  }

  export type AllianceGroupByOutputType = {
    id: string
    color: string
    score: number
    matchId: string
    createdAt: Date
    updatedAt: Date
    _count: AllianceCountAggregateOutputType | null
    _avg: AllianceAvgAggregateOutputType | null
    _sum: AllianceSumAggregateOutputType | null
    _min: AllianceMinAggregateOutputType | null
    _max: AllianceMaxAggregateOutputType | null
  }

  type GetAllianceGroupByPayload<T extends AllianceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AllianceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AllianceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AllianceGroupByOutputType[P]>
            : GetScalarType<T[P], AllianceGroupByOutputType[P]>
        }
      >
    >


  export type AllianceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    color?: boolean
    score?: boolean
    matchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
    teamAlliances?: boolean | Alliance$teamAlliancesArgs<ExtArgs>
    allianceScoring?: boolean | Alliance$allianceScoringArgs<ExtArgs>
    _count?: boolean | AllianceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alliance"]>

  export type AllianceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    color?: boolean
    score?: boolean
    matchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alliance"]>

  export type AllianceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    color?: boolean
    score?: boolean
    matchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alliance"]>

  export type AllianceSelectScalar = {
    id?: boolean
    color?: boolean
    score?: boolean
    matchId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AllianceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "color" | "score" | "matchId" | "createdAt" | "updatedAt", ExtArgs["result"]["alliance"]>
  export type AllianceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
    teamAlliances?: boolean | Alliance$teamAlliancesArgs<ExtArgs>
    allianceScoring?: boolean | Alliance$allianceScoringArgs<ExtArgs>
    _count?: boolean | AllianceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AllianceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type AllianceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $AlliancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alliance"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
      teamAlliances: Prisma.$TeamAlliancePayload<ExtArgs>[]
      allianceScoring: Prisma.$AllianceScoringPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      color: string
      score: number
      matchId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["alliance"]>
    composites: {}
  }

  type AllianceGetPayload<S extends boolean | null | undefined | AllianceDefaultArgs> = $Result.GetResult<Prisma.$AlliancePayload, S>

  type AllianceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AllianceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AllianceCountAggregateInputType | true
    }

  export interface AllianceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alliance'], meta: { name: 'Alliance' } }
    /**
     * Find zero or one Alliance that matches the filter.
     * @param {AllianceFindUniqueArgs} args - Arguments to find a Alliance
     * @example
     * // Get one Alliance
     * const alliance = await prisma.alliance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllianceFindUniqueArgs>(args: SelectSubset<T, AllianceFindUniqueArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alliance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AllianceFindUniqueOrThrowArgs} args - Arguments to find a Alliance
     * @example
     * // Get one Alliance
     * const alliance = await prisma.alliance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllianceFindUniqueOrThrowArgs>(args: SelectSubset<T, AllianceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alliance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceFindFirstArgs} args - Arguments to find a Alliance
     * @example
     * // Get one Alliance
     * const alliance = await prisma.alliance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllianceFindFirstArgs>(args?: SelectSubset<T, AllianceFindFirstArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alliance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceFindFirstOrThrowArgs} args - Arguments to find a Alliance
     * @example
     * // Get one Alliance
     * const alliance = await prisma.alliance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllianceFindFirstOrThrowArgs>(args?: SelectSubset<T, AllianceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alliances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alliances
     * const alliances = await prisma.alliance.findMany()
     * 
     * // Get first 10 Alliances
     * const alliances = await prisma.alliance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const allianceWithIdOnly = await prisma.alliance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AllianceFindManyArgs>(args?: SelectSubset<T, AllianceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alliance.
     * @param {AllianceCreateArgs} args - Arguments to create a Alliance.
     * @example
     * // Create one Alliance
     * const Alliance = await prisma.alliance.create({
     *   data: {
     *     // ... data to create a Alliance
     *   }
     * })
     * 
     */
    create<T extends AllianceCreateArgs>(args: SelectSubset<T, AllianceCreateArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alliances.
     * @param {AllianceCreateManyArgs} args - Arguments to create many Alliances.
     * @example
     * // Create many Alliances
     * const alliance = await prisma.alliance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AllianceCreateManyArgs>(args?: SelectSubset<T, AllianceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alliances and returns the data saved in the database.
     * @param {AllianceCreateManyAndReturnArgs} args - Arguments to create many Alliances.
     * @example
     * // Create many Alliances
     * const alliance = await prisma.alliance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alliances and only return the `id`
     * const allianceWithIdOnly = await prisma.alliance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AllianceCreateManyAndReturnArgs>(args?: SelectSubset<T, AllianceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alliance.
     * @param {AllianceDeleteArgs} args - Arguments to delete one Alliance.
     * @example
     * // Delete one Alliance
     * const Alliance = await prisma.alliance.delete({
     *   where: {
     *     // ... filter to delete one Alliance
     *   }
     * })
     * 
     */
    delete<T extends AllianceDeleteArgs>(args: SelectSubset<T, AllianceDeleteArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alliance.
     * @param {AllianceUpdateArgs} args - Arguments to update one Alliance.
     * @example
     * // Update one Alliance
     * const alliance = await prisma.alliance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AllianceUpdateArgs>(args: SelectSubset<T, AllianceUpdateArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alliances.
     * @param {AllianceDeleteManyArgs} args - Arguments to filter Alliances to delete.
     * @example
     * // Delete a few Alliances
     * const { count } = await prisma.alliance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AllianceDeleteManyArgs>(args?: SelectSubset<T, AllianceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alliances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alliances
     * const alliance = await prisma.alliance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AllianceUpdateManyArgs>(args: SelectSubset<T, AllianceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alliances and returns the data updated in the database.
     * @param {AllianceUpdateManyAndReturnArgs} args - Arguments to update many Alliances.
     * @example
     * // Update many Alliances
     * const alliance = await prisma.alliance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alliances and only return the `id`
     * const allianceWithIdOnly = await prisma.alliance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AllianceUpdateManyAndReturnArgs>(args: SelectSubset<T, AllianceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alliance.
     * @param {AllianceUpsertArgs} args - Arguments to update or create a Alliance.
     * @example
     * // Update or create a Alliance
     * const alliance = await prisma.alliance.upsert({
     *   create: {
     *     // ... data to create a Alliance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alliance we want to update
     *   }
     * })
     */
    upsert<T extends AllianceUpsertArgs>(args: SelectSubset<T, AllianceUpsertArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alliances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceCountArgs} args - Arguments to filter Alliances to count.
     * @example
     * // Count the number of Alliances
     * const count = await prisma.alliance.count({
     *   where: {
     *     // ... the filter for the Alliances we want to count
     *   }
     * })
    **/
    count<T extends AllianceCountArgs>(
      args?: Subset<T, AllianceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AllianceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alliance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllianceAggregateArgs>(args: Subset<T, AllianceAggregateArgs>): Prisma.PrismaPromise<GetAllianceAggregateType<T>>

    /**
     * Group by Alliance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AllianceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AllianceGroupByArgs['orderBy'] }
        : { orderBy?: AllianceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AllianceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllianceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alliance model
   */
  readonly fields: AllianceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alliance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AllianceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teamAlliances<T extends Alliance$teamAlliancesArgs<ExtArgs> = {}>(args?: Subset<T, Alliance$teamAlliancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allianceScoring<T extends Alliance$allianceScoringArgs<ExtArgs> = {}>(args?: Subset<T, Alliance$allianceScoringArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alliance model
   */
  interface AllianceFieldRefs {
    readonly id: FieldRef<"Alliance", 'String'>
    readonly color: FieldRef<"Alliance", 'String'>
    readonly score: FieldRef<"Alliance", 'Int'>
    readonly matchId: FieldRef<"Alliance", 'String'>
    readonly createdAt: FieldRef<"Alliance", 'DateTime'>
    readonly updatedAt: FieldRef<"Alliance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alliance findUnique
   */
  export type AllianceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter, which Alliance to fetch.
     */
    where: AllianceWhereUniqueInput
  }

  /**
   * Alliance findUniqueOrThrow
   */
  export type AllianceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter, which Alliance to fetch.
     */
    where: AllianceWhereUniqueInput
  }

  /**
   * Alliance findFirst
   */
  export type AllianceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter, which Alliance to fetch.
     */
    where?: AllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alliances to fetch.
     */
    orderBy?: AllianceOrderByWithRelationInput | AllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alliances.
     */
    cursor?: AllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alliances.
     */
    distinct?: AllianceScalarFieldEnum | AllianceScalarFieldEnum[]
  }

  /**
   * Alliance findFirstOrThrow
   */
  export type AllianceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter, which Alliance to fetch.
     */
    where?: AllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alliances to fetch.
     */
    orderBy?: AllianceOrderByWithRelationInput | AllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alliances.
     */
    cursor?: AllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alliances.
     */
    distinct?: AllianceScalarFieldEnum | AllianceScalarFieldEnum[]
  }

  /**
   * Alliance findMany
   */
  export type AllianceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter, which Alliances to fetch.
     */
    where?: AllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alliances to fetch.
     */
    orderBy?: AllianceOrderByWithRelationInput | AllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alliances.
     */
    cursor?: AllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alliances.
     */
    skip?: number
    distinct?: AllianceScalarFieldEnum | AllianceScalarFieldEnum[]
  }

  /**
   * Alliance create
   */
  export type AllianceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * The data needed to create a Alliance.
     */
    data: XOR<AllianceCreateInput, AllianceUncheckedCreateInput>
  }

  /**
   * Alliance createMany
   */
  export type AllianceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alliances.
     */
    data: AllianceCreateManyInput | AllianceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alliance createManyAndReturn
   */
  export type AllianceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * The data used to create many Alliances.
     */
    data: AllianceCreateManyInput | AllianceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alliance update
   */
  export type AllianceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * The data needed to update a Alliance.
     */
    data: XOR<AllianceUpdateInput, AllianceUncheckedUpdateInput>
    /**
     * Choose, which Alliance to update.
     */
    where: AllianceWhereUniqueInput
  }

  /**
   * Alliance updateMany
   */
  export type AllianceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alliances.
     */
    data: XOR<AllianceUpdateManyMutationInput, AllianceUncheckedUpdateManyInput>
    /**
     * Filter which Alliances to update
     */
    where?: AllianceWhereInput
    /**
     * Limit how many Alliances to update.
     */
    limit?: number
  }

  /**
   * Alliance updateManyAndReturn
   */
  export type AllianceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * The data used to update Alliances.
     */
    data: XOR<AllianceUpdateManyMutationInput, AllianceUncheckedUpdateManyInput>
    /**
     * Filter which Alliances to update
     */
    where?: AllianceWhereInput
    /**
     * Limit how many Alliances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alliance upsert
   */
  export type AllianceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * The filter to search for the Alliance to update in case it exists.
     */
    where: AllianceWhereUniqueInput
    /**
     * In case the Alliance found by the `where` argument doesn't exist, create a new Alliance with this data.
     */
    create: XOR<AllianceCreateInput, AllianceUncheckedCreateInput>
    /**
     * In case the Alliance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AllianceUpdateInput, AllianceUncheckedUpdateInput>
  }

  /**
   * Alliance delete
   */
  export type AllianceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
    /**
     * Filter which Alliance to delete.
     */
    where: AllianceWhereUniqueInput
  }

  /**
   * Alliance deleteMany
   */
  export type AllianceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alliances to delete
     */
    where?: AllianceWhereInput
    /**
     * Limit how many Alliances to delete.
     */
    limit?: number
  }

  /**
   * Alliance.teamAlliances
   */
  export type Alliance$teamAlliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    where?: TeamAllianceWhereInput
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    cursor?: TeamAllianceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamAllianceScalarFieldEnum | TeamAllianceScalarFieldEnum[]
  }

  /**
   * Alliance.allianceScoring
   */
  export type Alliance$allianceScoringArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    where?: AllianceScoringWhereInput
  }

  /**
   * Alliance without action
   */
  export type AllianceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alliance
     */
    select?: AllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alliance
     */
    omit?: AllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceInclude<ExtArgs> | null
  }


  /**
   * Model AllianceScoring
   */

  export type AggregateAllianceScoring = {
    _count: AllianceScoringCountAggregateOutputType | null
    _min: AllianceScoringMinAggregateOutputType | null
    _max: AllianceScoringMaxAggregateOutputType | null
  }

  export type AllianceScoringMinAggregateOutputType = {
    id: string | null
    allianceId: string | null
    refereeId: string | null
    card: $Enums.CardType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllianceScoringMaxAggregateOutputType = {
    id: string | null
    allianceId: string | null
    refereeId: string | null
    card: $Enums.CardType | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AllianceScoringCountAggregateOutputType = {
    id: number
    allianceId: number
    refereeId: number
    scoreDetails: number
    card: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AllianceScoringMinAggregateInputType = {
    id?: true
    allianceId?: true
    refereeId?: true
    card?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllianceScoringMaxAggregateInputType = {
    id?: true
    allianceId?: true
    refereeId?: true
    card?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AllianceScoringCountAggregateInputType = {
    id?: true
    allianceId?: true
    refereeId?: true
    scoreDetails?: true
    card?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AllianceScoringAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllianceScoring to aggregate.
     */
    where?: AllianceScoringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllianceScorings to fetch.
     */
    orderBy?: AllianceScoringOrderByWithRelationInput | AllianceScoringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AllianceScoringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllianceScorings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllianceScorings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AllianceScorings
    **/
    _count?: true | AllianceScoringCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AllianceScoringMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AllianceScoringMaxAggregateInputType
  }

  export type GetAllianceScoringAggregateType<T extends AllianceScoringAggregateArgs> = {
        [P in keyof T & keyof AggregateAllianceScoring]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAllianceScoring[P]>
      : GetScalarType<T[P], AggregateAllianceScoring[P]>
  }




  export type AllianceScoringGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllianceScoringWhereInput
    orderBy?: AllianceScoringOrderByWithAggregationInput | AllianceScoringOrderByWithAggregationInput[]
    by: AllianceScoringScalarFieldEnum[] | AllianceScoringScalarFieldEnum
    having?: AllianceScoringScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AllianceScoringCountAggregateInputType | true
    _min?: AllianceScoringMinAggregateInputType
    _max?: AllianceScoringMaxAggregateInputType
  }

  export type AllianceScoringGroupByOutputType = {
    id: string
    allianceId: string
    refereeId: string | null
    scoreDetails: JsonValue | null
    card: $Enums.CardType
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AllianceScoringCountAggregateOutputType | null
    _min: AllianceScoringMinAggregateOutputType | null
    _max: AllianceScoringMaxAggregateOutputType | null
  }

  type GetAllianceScoringGroupByPayload<T extends AllianceScoringGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AllianceScoringGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AllianceScoringGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AllianceScoringGroupByOutputType[P]>
            : GetScalarType<T[P], AllianceScoringGroupByOutputType[P]>
        }
      >
    >


  export type AllianceScoringSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allianceId?: boolean
    refereeId?: boolean
    scoreDetails?: boolean
    card?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }, ExtArgs["result"]["allianceScoring"]>

  export type AllianceScoringSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allianceId?: boolean
    refereeId?: boolean
    scoreDetails?: boolean
    card?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }, ExtArgs["result"]["allianceScoring"]>

  export type AllianceScoringSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    allianceId?: boolean
    refereeId?: boolean
    scoreDetails?: boolean
    card?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }, ExtArgs["result"]["allianceScoring"]>

  export type AllianceScoringSelectScalar = {
    id?: boolean
    allianceId?: boolean
    refereeId?: boolean
    scoreDetails?: boolean
    card?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AllianceScoringOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "allianceId" | "refereeId" | "scoreDetails" | "card" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["allianceScoring"]>
  export type AllianceScoringInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }
  export type AllianceScoringIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }
  export type AllianceScoringIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
    referee?: boolean | AllianceScoring$refereeArgs<ExtArgs>
  }

  export type $AllianceScoringPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AllianceScoring"
    objects: {
      alliance: Prisma.$AlliancePayload<ExtArgs>
      referee: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      allianceId: string
      refereeId: string | null
      scoreDetails: Prisma.JsonValue | null
      card: $Enums.CardType
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["allianceScoring"]>
    composites: {}
  }

  type AllianceScoringGetPayload<S extends boolean | null | undefined | AllianceScoringDefaultArgs> = $Result.GetResult<Prisma.$AllianceScoringPayload, S>

  type AllianceScoringCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AllianceScoringFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AllianceScoringCountAggregateInputType | true
    }

  export interface AllianceScoringDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AllianceScoring'], meta: { name: 'AllianceScoring' } }
    /**
     * Find zero or one AllianceScoring that matches the filter.
     * @param {AllianceScoringFindUniqueArgs} args - Arguments to find a AllianceScoring
     * @example
     * // Get one AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllianceScoringFindUniqueArgs>(args: SelectSubset<T, AllianceScoringFindUniqueArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AllianceScoring that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AllianceScoringFindUniqueOrThrowArgs} args - Arguments to find a AllianceScoring
     * @example
     * // Get one AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllianceScoringFindUniqueOrThrowArgs>(args: SelectSubset<T, AllianceScoringFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AllianceScoring that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringFindFirstArgs} args - Arguments to find a AllianceScoring
     * @example
     * // Get one AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllianceScoringFindFirstArgs>(args?: SelectSubset<T, AllianceScoringFindFirstArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AllianceScoring that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringFindFirstOrThrowArgs} args - Arguments to find a AllianceScoring
     * @example
     * // Get one AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllianceScoringFindFirstOrThrowArgs>(args?: SelectSubset<T, AllianceScoringFindFirstOrThrowArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AllianceScorings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AllianceScorings
     * const allianceScorings = await prisma.allianceScoring.findMany()
     * 
     * // Get first 10 AllianceScorings
     * const allianceScorings = await prisma.allianceScoring.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const allianceScoringWithIdOnly = await prisma.allianceScoring.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AllianceScoringFindManyArgs>(args?: SelectSubset<T, AllianceScoringFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AllianceScoring.
     * @param {AllianceScoringCreateArgs} args - Arguments to create a AllianceScoring.
     * @example
     * // Create one AllianceScoring
     * const AllianceScoring = await prisma.allianceScoring.create({
     *   data: {
     *     // ... data to create a AllianceScoring
     *   }
     * })
     * 
     */
    create<T extends AllianceScoringCreateArgs>(args: SelectSubset<T, AllianceScoringCreateArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AllianceScorings.
     * @param {AllianceScoringCreateManyArgs} args - Arguments to create many AllianceScorings.
     * @example
     * // Create many AllianceScorings
     * const allianceScoring = await prisma.allianceScoring.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AllianceScoringCreateManyArgs>(args?: SelectSubset<T, AllianceScoringCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AllianceScorings and returns the data saved in the database.
     * @param {AllianceScoringCreateManyAndReturnArgs} args - Arguments to create many AllianceScorings.
     * @example
     * // Create many AllianceScorings
     * const allianceScoring = await prisma.allianceScoring.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AllianceScorings and only return the `id`
     * const allianceScoringWithIdOnly = await prisma.allianceScoring.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AllianceScoringCreateManyAndReturnArgs>(args?: SelectSubset<T, AllianceScoringCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AllianceScoring.
     * @param {AllianceScoringDeleteArgs} args - Arguments to delete one AllianceScoring.
     * @example
     * // Delete one AllianceScoring
     * const AllianceScoring = await prisma.allianceScoring.delete({
     *   where: {
     *     // ... filter to delete one AllianceScoring
     *   }
     * })
     * 
     */
    delete<T extends AllianceScoringDeleteArgs>(args: SelectSubset<T, AllianceScoringDeleteArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AllianceScoring.
     * @param {AllianceScoringUpdateArgs} args - Arguments to update one AllianceScoring.
     * @example
     * // Update one AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AllianceScoringUpdateArgs>(args: SelectSubset<T, AllianceScoringUpdateArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AllianceScorings.
     * @param {AllianceScoringDeleteManyArgs} args - Arguments to filter AllianceScorings to delete.
     * @example
     * // Delete a few AllianceScorings
     * const { count } = await prisma.allianceScoring.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AllianceScoringDeleteManyArgs>(args?: SelectSubset<T, AllianceScoringDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AllianceScorings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AllianceScorings
     * const allianceScoring = await prisma.allianceScoring.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AllianceScoringUpdateManyArgs>(args: SelectSubset<T, AllianceScoringUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AllianceScorings and returns the data updated in the database.
     * @param {AllianceScoringUpdateManyAndReturnArgs} args - Arguments to update many AllianceScorings.
     * @example
     * // Update many AllianceScorings
     * const allianceScoring = await prisma.allianceScoring.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AllianceScorings and only return the `id`
     * const allianceScoringWithIdOnly = await prisma.allianceScoring.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AllianceScoringUpdateManyAndReturnArgs>(args: SelectSubset<T, AllianceScoringUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AllianceScoring.
     * @param {AllianceScoringUpsertArgs} args - Arguments to update or create a AllianceScoring.
     * @example
     * // Update or create a AllianceScoring
     * const allianceScoring = await prisma.allianceScoring.upsert({
     *   create: {
     *     // ... data to create a AllianceScoring
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AllianceScoring we want to update
     *   }
     * })
     */
    upsert<T extends AllianceScoringUpsertArgs>(args: SelectSubset<T, AllianceScoringUpsertArgs<ExtArgs>>): Prisma__AllianceScoringClient<$Result.GetResult<Prisma.$AllianceScoringPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AllianceScorings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringCountArgs} args - Arguments to filter AllianceScorings to count.
     * @example
     * // Count the number of AllianceScorings
     * const count = await prisma.allianceScoring.count({
     *   where: {
     *     // ... the filter for the AllianceScorings we want to count
     *   }
     * })
    **/
    count<T extends AllianceScoringCountArgs>(
      args?: Subset<T, AllianceScoringCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AllianceScoringCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AllianceScoring.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllianceScoringAggregateArgs>(args: Subset<T, AllianceScoringAggregateArgs>): Prisma.PrismaPromise<GetAllianceScoringAggregateType<T>>

    /**
     * Group by AllianceScoring.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllianceScoringGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AllianceScoringGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AllianceScoringGroupByArgs['orderBy'] }
        : { orderBy?: AllianceScoringGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AllianceScoringGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllianceScoringGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AllianceScoring model
   */
  readonly fields: AllianceScoringFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AllianceScoring.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AllianceScoringClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alliance<T extends AllianceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AllianceDefaultArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    referee<T extends AllianceScoring$refereeArgs<ExtArgs> = {}>(args?: Subset<T, AllianceScoring$refereeArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AllianceScoring model
   */
  interface AllianceScoringFieldRefs {
    readonly id: FieldRef<"AllianceScoring", 'String'>
    readonly allianceId: FieldRef<"AllianceScoring", 'String'>
    readonly refereeId: FieldRef<"AllianceScoring", 'String'>
    readonly scoreDetails: FieldRef<"AllianceScoring", 'Json'>
    readonly card: FieldRef<"AllianceScoring", 'CardType'>
    readonly notes: FieldRef<"AllianceScoring", 'String'>
    readonly createdAt: FieldRef<"AllianceScoring", 'DateTime'>
    readonly updatedAt: FieldRef<"AllianceScoring", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AllianceScoring findUnique
   */
  export type AllianceScoringFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter, which AllianceScoring to fetch.
     */
    where: AllianceScoringWhereUniqueInput
  }

  /**
   * AllianceScoring findUniqueOrThrow
   */
  export type AllianceScoringFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter, which AllianceScoring to fetch.
     */
    where: AllianceScoringWhereUniqueInput
  }

  /**
   * AllianceScoring findFirst
   */
  export type AllianceScoringFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter, which AllianceScoring to fetch.
     */
    where?: AllianceScoringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllianceScorings to fetch.
     */
    orderBy?: AllianceScoringOrderByWithRelationInput | AllianceScoringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllianceScorings.
     */
    cursor?: AllianceScoringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllianceScorings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllianceScorings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllianceScorings.
     */
    distinct?: AllianceScoringScalarFieldEnum | AllianceScoringScalarFieldEnum[]
  }

  /**
   * AllianceScoring findFirstOrThrow
   */
  export type AllianceScoringFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter, which AllianceScoring to fetch.
     */
    where?: AllianceScoringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllianceScorings to fetch.
     */
    orderBy?: AllianceScoringOrderByWithRelationInput | AllianceScoringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AllianceScorings.
     */
    cursor?: AllianceScoringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllianceScorings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllianceScorings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AllianceScorings.
     */
    distinct?: AllianceScoringScalarFieldEnum | AllianceScoringScalarFieldEnum[]
  }

  /**
   * AllianceScoring findMany
   */
  export type AllianceScoringFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter, which AllianceScorings to fetch.
     */
    where?: AllianceScoringWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AllianceScorings to fetch.
     */
    orderBy?: AllianceScoringOrderByWithRelationInput | AllianceScoringOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AllianceScorings.
     */
    cursor?: AllianceScoringWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AllianceScorings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AllianceScorings.
     */
    skip?: number
    distinct?: AllianceScoringScalarFieldEnum | AllianceScoringScalarFieldEnum[]
  }

  /**
   * AllianceScoring create
   */
  export type AllianceScoringCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * The data needed to create a AllianceScoring.
     */
    data: XOR<AllianceScoringCreateInput, AllianceScoringUncheckedCreateInput>
  }

  /**
   * AllianceScoring createMany
   */
  export type AllianceScoringCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AllianceScorings.
     */
    data: AllianceScoringCreateManyInput | AllianceScoringCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AllianceScoring createManyAndReturn
   */
  export type AllianceScoringCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * The data used to create many AllianceScorings.
     */
    data: AllianceScoringCreateManyInput | AllianceScoringCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AllianceScoring update
   */
  export type AllianceScoringUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * The data needed to update a AllianceScoring.
     */
    data: XOR<AllianceScoringUpdateInput, AllianceScoringUncheckedUpdateInput>
    /**
     * Choose, which AllianceScoring to update.
     */
    where: AllianceScoringWhereUniqueInput
  }

  /**
   * AllianceScoring updateMany
   */
  export type AllianceScoringUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AllianceScorings.
     */
    data: XOR<AllianceScoringUpdateManyMutationInput, AllianceScoringUncheckedUpdateManyInput>
    /**
     * Filter which AllianceScorings to update
     */
    where?: AllianceScoringWhereInput
    /**
     * Limit how many AllianceScorings to update.
     */
    limit?: number
  }

  /**
   * AllianceScoring updateManyAndReturn
   */
  export type AllianceScoringUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * The data used to update AllianceScorings.
     */
    data: XOR<AllianceScoringUpdateManyMutationInput, AllianceScoringUncheckedUpdateManyInput>
    /**
     * Filter which AllianceScorings to update
     */
    where?: AllianceScoringWhereInput
    /**
     * Limit how many AllianceScorings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AllianceScoring upsert
   */
  export type AllianceScoringUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * The filter to search for the AllianceScoring to update in case it exists.
     */
    where: AllianceScoringWhereUniqueInput
    /**
     * In case the AllianceScoring found by the `where` argument doesn't exist, create a new AllianceScoring with this data.
     */
    create: XOR<AllianceScoringCreateInput, AllianceScoringUncheckedCreateInput>
    /**
     * In case the AllianceScoring was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AllianceScoringUpdateInput, AllianceScoringUncheckedUpdateInput>
  }

  /**
   * AllianceScoring delete
   */
  export type AllianceScoringDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
    /**
     * Filter which AllianceScoring to delete.
     */
    where: AllianceScoringWhereUniqueInput
  }

  /**
   * AllianceScoring deleteMany
   */
  export type AllianceScoringDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AllianceScorings to delete
     */
    where?: AllianceScoringWhereInput
    /**
     * Limit how many AllianceScorings to delete.
     */
    limit?: number
  }

  /**
   * AllianceScoring.referee
   */
  export type AllianceScoring$refereeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AllianceScoring without action
   */
  export type AllianceScoringDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AllianceScoring
     */
    select?: AllianceScoringSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AllianceScoring
     */
    omit?: AllianceScoringOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllianceScoringInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamMinAggregateOutputType = {
    id: string | null
    teamNumber: string | null
    name: string | null
    organization: string | null
    avatar: string | null
    description: string | null
    tournamentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: string | null
    teamNumber: string | null
    name: string | null
    organization: string | null
    avatar: string | null
    description: string | null
    tournamentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    teamNumber: number
    name: number
    organization: number
    avatar: number
    description: number
    teamMembers: number
    tournamentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamMinAggregateInputType = {
    id?: true
    teamNumber?: true
    name?: true
    organization?: true
    avatar?: true
    description?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    teamNumber?: true
    name?: true
    organization?: true
    avatar?: true
    description?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    teamNumber?: true
    name?: true
    organization?: true
    avatar?: true
    description?: true
    teamMembers?: true
    tournamentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: string
    teamNumber: string
    name: string
    organization: string | null
    avatar: string | null
    description: string | null
    teamMembers: JsonValue | null
    tournamentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TeamCountAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamNumber?: boolean
    name?: boolean
    organization?: boolean
    avatar?: boolean
    description?: boolean
    teamMembers?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
    teamAlliances?: boolean | Team$teamAlliancesArgs<ExtArgs>
    teamStats?: boolean | Team$teamStatsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamNumber?: boolean
    name?: boolean
    organization?: boolean
    avatar?: boolean
    description?: boolean
    teamMembers?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamNumber?: boolean
    name?: boolean
    organization?: boolean
    avatar?: boolean
    description?: boolean
    teamMembers?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    teamNumber?: boolean
    name?: boolean
    organization?: boolean
    avatar?: boolean
    description?: boolean
    teamMembers?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamNumber" | "name" | "organization" | "avatar" | "description" | "teamMembers" | "tournamentId" | "createdAt" | "updatedAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
    teamAlliances?: boolean | Team$teamAlliancesArgs<ExtArgs>
    teamStats?: boolean | Team$teamStatsArgs<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | Team$tournamentArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs> | null
      teamAlliances: Prisma.$TeamAlliancePayload<ExtArgs>[]
      teamStats: Prisma.$TeamStatsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamNumber: string
      name: string
      organization: string | null
      avatar: string | null
      description: string | null
      teamMembers: Prisma.JsonValue | null
      tournamentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends Team$tournamentArgs<ExtArgs> = {}>(args?: Subset<T, Team$tournamentArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teamAlliances<T extends Team$teamAlliancesArgs<ExtArgs> = {}>(args?: Subset<T, Team$teamAlliancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teamStats<T extends Team$teamStatsArgs<ExtArgs> = {}>(args?: Subset<T, Team$teamStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'String'>
    readonly teamNumber: FieldRef<"Team", 'String'>
    readonly name: FieldRef<"Team", 'String'>
    readonly organization: FieldRef<"Team", 'String'>
    readonly avatar: FieldRef<"Team", 'String'>
    readonly description: FieldRef<"Team", 'String'>
    readonly teamMembers: FieldRef<"Team", 'Json'>
    readonly tournamentId: FieldRef<"Team", 'String'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
    readonly updatedAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.tournament
   */
  export type Team$tournamentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
  }

  /**
   * Team.teamAlliances
   */
  export type Team$teamAlliancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    where?: TeamAllianceWhereInput
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    cursor?: TeamAllianceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamAllianceScalarFieldEnum | TeamAllianceScalarFieldEnum[]
  }

  /**
   * Team.teamStats
   */
  export type Team$teamStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    where?: TeamStatsWhereInput
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    cursor?: TeamStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamAlliance
   */

  export type AggregateTeamAlliance = {
    _count: TeamAllianceCountAggregateOutputType | null
    _avg: TeamAllianceAvgAggregateOutputType | null
    _sum: TeamAllianceSumAggregateOutputType | null
    _min: TeamAllianceMinAggregateOutputType | null
    _max: TeamAllianceMaxAggregateOutputType | null
  }

  export type TeamAllianceAvgAggregateOutputType = {
    stationPosition: number | null
  }

  export type TeamAllianceSumAggregateOutputType = {
    stationPosition: number | null
  }

  export type TeamAllianceMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    allianceId: string | null
    stationPosition: number | null
    isSurrogate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamAllianceMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    allianceId: string | null
    stationPosition: number | null
    isSurrogate: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamAllianceCountAggregateOutputType = {
    id: number
    teamId: number
    allianceId: number
    stationPosition: number
    isSurrogate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamAllianceAvgAggregateInputType = {
    stationPosition?: true
  }

  export type TeamAllianceSumAggregateInputType = {
    stationPosition?: true
  }

  export type TeamAllianceMinAggregateInputType = {
    id?: true
    teamId?: true
    allianceId?: true
    stationPosition?: true
    isSurrogate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamAllianceMaxAggregateInputType = {
    id?: true
    teamId?: true
    allianceId?: true
    stationPosition?: true
    isSurrogate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamAllianceCountAggregateInputType = {
    id?: true
    teamId?: true
    allianceId?: true
    stationPosition?: true
    isSurrogate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamAllianceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamAlliance to aggregate.
     */
    where?: TeamAllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamAlliances to fetch.
     */
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamAllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamAlliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamAlliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamAlliances
    **/
    _count?: true | TeamAllianceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamAllianceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamAllianceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamAllianceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamAllianceMaxAggregateInputType
  }

  export type GetTeamAllianceAggregateType<T extends TeamAllianceAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamAlliance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamAlliance[P]>
      : GetScalarType<T[P], AggregateTeamAlliance[P]>
  }




  export type TeamAllianceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamAllianceWhereInput
    orderBy?: TeamAllianceOrderByWithAggregationInput | TeamAllianceOrderByWithAggregationInput[]
    by: TeamAllianceScalarFieldEnum[] | TeamAllianceScalarFieldEnum
    having?: TeamAllianceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamAllianceCountAggregateInputType | true
    _avg?: TeamAllianceAvgAggregateInputType
    _sum?: TeamAllianceSumAggregateInputType
    _min?: TeamAllianceMinAggregateInputType
    _max?: TeamAllianceMaxAggregateInputType
  }

  export type TeamAllianceGroupByOutputType = {
    id: string
    teamId: string
    allianceId: string
    stationPosition: number
    isSurrogate: boolean
    createdAt: Date
    updatedAt: Date
    _count: TeamAllianceCountAggregateOutputType | null
    _avg: TeamAllianceAvgAggregateOutputType | null
    _sum: TeamAllianceSumAggregateOutputType | null
    _min: TeamAllianceMinAggregateOutputType | null
    _max: TeamAllianceMaxAggregateOutputType | null
  }

  type GetTeamAllianceGroupByPayload<T extends TeamAllianceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamAllianceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamAllianceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamAllianceGroupByOutputType[P]>
            : GetScalarType<T[P], TeamAllianceGroupByOutputType[P]>
        }
      >
    >


  export type TeamAllianceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    allianceId?: boolean
    stationPosition?: boolean
    isSurrogate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamAlliance"]>

  export type TeamAllianceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    allianceId?: boolean
    stationPosition?: boolean
    isSurrogate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamAlliance"]>

  export type TeamAllianceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    allianceId?: boolean
    stationPosition?: boolean
    isSurrogate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamAlliance"]>

  export type TeamAllianceSelectScalar = {
    id?: boolean
    teamId?: boolean
    allianceId?: boolean
    stationPosition?: boolean
    isSurrogate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamAllianceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "allianceId" | "stationPosition" | "isSurrogate" | "createdAt" | "updatedAt", ExtArgs["result"]["teamAlliance"]>
  export type TeamAllianceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }
  export type TeamAllianceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }
  export type TeamAllianceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    alliance?: boolean | AllianceDefaultArgs<ExtArgs>
  }

  export type $TeamAlliancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamAlliance"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      alliance: Prisma.$AlliancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      allianceId: string
      stationPosition: number
      isSurrogate: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teamAlliance"]>
    composites: {}
  }

  type TeamAllianceGetPayload<S extends boolean | null | undefined | TeamAllianceDefaultArgs> = $Result.GetResult<Prisma.$TeamAlliancePayload, S>

  type TeamAllianceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamAllianceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamAllianceCountAggregateInputType | true
    }

  export interface TeamAllianceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamAlliance'], meta: { name: 'TeamAlliance' } }
    /**
     * Find zero or one TeamAlliance that matches the filter.
     * @param {TeamAllianceFindUniqueArgs} args - Arguments to find a TeamAlliance
     * @example
     * // Get one TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamAllianceFindUniqueArgs>(args: SelectSubset<T, TeamAllianceFindUniqueArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamAlliance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamAllianceFindUniqueOrThrowArgs} args - Arguments to find a TeamAlliance
     * @example
     * // Get one TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamAllianceFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamAllianceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamAlliance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceFindFirstArgs} args - Arguments to find a TeamAlliance
     * @example
     * // Get one TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamAllianceFindFirstArgs>(args?: SelectSubset<T, TeamAllianceFindFirstArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamAlliance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceFindFirstOrThrowArgs} args - Arguments to find a TeamAlliance
     * @example
     * // Get one TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamAllianceFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamAllianceFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamAlliances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamAlliances
     * const teamAlliances = await prisma.teamAlliance.findMany()
     * 
     * // Get first 10 TeamAlliances
     * const teamAlliances = await prisma.teamAlliance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamAllianceWithIdOnly = await prisma.teamAlliance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamAllianceFindManyArgs>(args?: SelectSubset<T, TeamAllianceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamAlliance.
     * @param {TeamAllianceCreateArgs} args - Arguments to create a TeamAlliance.
     * @example
     * // Create one TeamAlliance
     * const TeamAlliance = await prisma.teamAlliance.create({
     *   data: {
     *     // ... data to create a TeamAlliance
     *   }
     * })
     * 
     */
    create<T extends TeamAllianceCreateArgs>(args: SelectSubset<T, TeamAllianceCreateArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamAlliances.
     * @param {TeamAllianceCreateManyArgs} args - Arguments to create many TeamAlliances.
     * @example
     * // Create many TeamAlliances
     * const teamAlliance = await prisma.teamAlliance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamAllianceCreateManyArgs>(args?: SelectSubset<T, TeamAllianceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamAlliances and returns the data saved in the database.
     * @param {TeamAllianceCreateManyAndReturnArgs} args - Arguments to create many TeamAlliances.
     * @example
     * // Create many TeamAlliances
     * const teamAlliance = await prisma.teamAlliance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamAlliances and only return the `id`
     * const teamAllianceWithIdOnly = await prisma.teamAlliance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamAllianceCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamAllianceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamAlliance.
     * @param {TeamAllianceDeleteArgs} args - Arguments to delete one TeamAlliance.
     * @example
     * // Delete one TeamAlliance
     * const TeamAlliance = await prisma.teamAlliance.delete({
     *   where: {
     *     // ... filter to delete one TeamAlliance
     *   }
     * })
     * 
     */
    delete<T extends TeamAllianceDeleteArgs>(args: SelectSubset<T, TeamAllianceDeleteArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamAlliance.
     * @param {TeamAllianceUpdateArgs} args - Arguments to update one TeamAlliance.
     * @example
     * // Update one TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamAllianceUpdateArgs>(args: SelectSubset<T, TeamAllianceUpdateArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamAlliances.
     * @param {TeamAllianceDeleteManyArgs} args - Arguments to filter TeamAlliances to delete.
     * @example
     * // Delete a few TeamAlliances
     * const { count } = await prisma.teamAlliance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamAllianceDeleteManyArgs>(args?: SelectSubset<T, TeamAllianceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamAlliances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamAlliances
     * const teamAlliance = await prisma.teamAlliance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamAllianceUpdateManyArgs>(args: SelectSubset<T, TeamAllianceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamAlliances and returns the data updated in the database.
     * @param {TeamAllianceUpdateManyAndReturnArgs} args - Arguments to update many TeamAlliances.
     * @example
     * // Update many TeamAlliances
     * const teamAlliance = await prisma.teamAlliance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamAlliances and only return the `id`
     * const teamAllianceWithIdOnly = await prisma.teamAlliance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamAllianceUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamAllianceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamAlliance.
     * @param {TeamAllianceUpsertArgs} args - Arguments to update or create a TeamAlliance.
     * @example
     * // Update or create a TeamAlliance
     * const teamAlliance = await prisma.teamAlliance.upsert({
     *   create: {
     *     // ... data to create a TeamAlliance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamAlliance we want to update
     *   }
     * })
     */
    upsert<T extends TeamAllianceUpsertArgs>(args: SelectSubset<T, TeamAllianceUpsertArgs<ExtArgs>>): Prisma__TeamAllianceClient<$Result.GetResult<Prisma.$TeamAlliancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamAlliances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceCountArgs} args - Arguments to filter TeamAlliances to count.
     * @example
     * // Count the number of TeamAlliances
     * const count = await prisma.teamAlliance.count({
     *   where: {
     *     // ... the filter for the TeamAlliances we want to count
     *   }
     * })
    **/
    count<T extends TeamAllianceCountArgs>(
      args?: Subset<T, TeamAllianceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamAllianceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamAlliance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAllianceAggregateArgs>(args: Subset<T, TeamAllianceAggregateArgs>): Prisma.PrismaPromise<GetTeamAllianceAggregateType<T>>

    /**
     * Group by TeamAlliance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAllianceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamAllianceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamAllianceGroupByArgs['orderBy'] }
        : { orderBy?: TeamAllianceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamAllianceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamAllianceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamAlliance model
   */
  readonly fields: TeamAllianceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamAlliance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamAllianceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    alliance<T extends AllianceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AllianceDefaultArgs<ExtArgs>>): Prisma__AllianceClient<$Result.GetResult<Prisma.$AlliancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamAlliance model
   */
  interface TeamAllianceFieldRefs {
    readonly id: FieldRef<"TeamAlliance", 'String'>
    readonly teamId: FieldRef<"TeamAlliance", 'String'>
    readonly allianceId: FieldRef<"TeamAlliance", 'String'>
    readonly stationPosition: FieldRef<"TeamAlliance", 'Int'>
    readonly isSurrogate: FieldRef<"TeamAlliance", 'Boolean'>
    readonly createdAt: FieldRef<"TeamAlliance", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamAlliance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamAlliance findUnique
   */
  export type TeamAllianceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter, which TeamAlliance to fetch.
     */
    where: TeamAllianceWhereUniqueInput
  }

  /**
   * TeamAlliance findUniqueOrThrow
   */
  export type TeamAllianceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter, which TeamAlliance to fetch.
     */
    where: TeamAllianceWhereUniqueInput
  }

  /**
   * TeamAlliance findFirst
   */
  export type TeamAllianceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter, which TeamAlliance to fetch.
     */
    where?: TeamAllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamAlliances to fetch.
     */
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamAlliances.
     */
    cursor?: TeamAllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamAlliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamAlliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamAlliances.
     */
    distinct?: TeamAllianceScalarFieldEnum | TeamAllianceScalarFieldEnum[]
  }

  /**
   * TeamAlliance findFirstOrThrow
   */
  export type TeamAllianceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter, which TeamAlliance to fetch.
     */
    where?: TeamAllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamAlliances to fetch.
     */
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamAlliances.
     */
    cursor?: TeamAllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamAlliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamAlliances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamAlliances.
     */
    distinct?: TeamAllianceScalarFieldEnum | TeamAllianceScalarFieldEnum[]
  }

  /**
   * TeamAlliance findMany
   */
  export type TeamAllianceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter, which TeamAlliances to fetch.
     */
    where?: TeamAllianceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamAlliances to fetch.
     */
    orderBy?: TeamAllianceOrderByWithRelationInput | TeamAllianceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamAlliances.
     */
    cursor?: TeamAllianceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamAlliances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamAlliances.
     */
    skip?: number
    distinct?: TeamAllianceScalarFieldEnum | TeamAllianceScalarFieldEnum[]
  }

  /**
   * TeamAlliance create
   */
  export type TeamAllianceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamAlliance.
     */
    data: XOR<TeamAllianceCreateInput, TeamAllianceUncheckedCreateInput>
  }

  /**
   * TeamAlliance createMany
   */
  export type TeamAllianceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamAlliances.
     */
    data: TeamAllianceCreateManyInput | TeamAllianceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamAlliance createManyAndReturn
   */
  export type TeamAllianceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * The data used to create many TeamAlliances.
     */
    data: TeamAllianceCreateManyInput | TeamAllianceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamAlliance update
   */
  export type TeamAllianceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamAlliance.
     */
    data: XOR<TeamAllianceUpdateInput, TeamAllianceUncheckedUpdateInput>
    /**
     * Choose, which TeamAlliance to update.
     */
    where: TeamAllianceWhereUniqueInput
  }

  /**
   * TeamAlliance updateMany
   */
  export type TeamAllianceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamAlliances.
     */
    data: XOR<TeamAllianceUpdateManyMutationInput, TeamAllianceUncheckedUpdateManyInput>
    /**
     * Filter which TeamAlliances to update
     */
    where?: TeamAllianceWhereInput
    /**
     * Limit how many TeamAlliances to update.
     */
    limit?: number
  }

  /**
   * TeamAlliance updateManyAndReturn
   */
  export type TeamAllianceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * The data used to update TeamAlliances.
     */
    data: XOR<TeamAllianceUpdateManyMutationInput, TeamAllianceUncheckedUpdateManyInput>
    /**
     * Filter which TeamAlliances to update
     */
    where?: TeamAllianceWhereInput
    /**
     * Limit how many TeamAlliances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamAlliance upsert
   */
  export type TeamAllianceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamAlliance to update in case it exists.
     */
    where: TeamAllianceWhereUniqueInput
    /**
     * In case the TeamAlliance found by the `where` argument doesn't exist, create a new TeamAlliance with this data.
     */
    create: XOR<TeamAllianceCreateInput, TeamAllianceUncheckedCreateInput>
    /**
     * In case the TeamAlliance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamAllianceUpdateInput, TeamAllianceUncheckedUpdateInput>
  }

  /**
   * TeamAlliance delete
   */
  export type TeamAllianceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
    /**
     * Filter which TeamAlliance to delete.
     */
    where: TeamAllianceWhereUniqueInput
  }

  /**
   * TeamAlliance deleteMany
   */
  export type TeamAllianceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamAlliances to delete
     */
    where?: TeamAllianceWhereInput
    /**
     * Limit how many TeamAlliances to delete.
     */
    limit?: number
  }

  /**
   * TeamAlliance without action
   */
  export type TeamAllianceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamAlliance
     */
    select?: TeamAllianceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamAlliance
     */
    omit?: TeamAllianceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamAllianceInclude<ExtArgs> | null
  }


  /**
   * Model MatchScores
   */

  export type AggregateMatchScores = {
    _count: MatchScoresCountAggregateOutputType | null
    _avg: MatchScoresAvgAggregateOutputType | null
    _sum: MatchScoresSumAggregateOutputType | null
    _min: MatchScoresMinAggregateOutputType | null
    _max: MatchScoresMaxAggregateOutputType | null
  }

  export type MatchScoresAvgAggregateOutputType = {
    redAutoScore: number | null
    redDriveScore: number | null
    redTotalScore: number | null
    blueAutoScore: number | null
    blueDriveScore: number | null
    blueTotalScore: number | null
    redTeamCount: number | null
    redMultiplier: number | null
    blueTeamCount: number | null
    blueMultiplier: number | null
  }

  export type MatchScoresSumAggregateOutputType = {
    redAutoScore: number | null
    redDriveScore: number | null
    redTotalScore: number | null
    blueAutoScore: number | null
    blueDriveScore: number | null
    blueTotalScore: number | null
    redTeamCount: number | null
    redMultiplier: number | null
    blueTeamCount: number | null
    blueMultiplier: number | null
  }

  export type MatchScoresMinAggregateOutputType = {
    id: string | null
    matchId: string | null
    redAutoScore: number | null
    redDriveScore: number | null
    redTotalScore: number | null
    blueAutoScore: number | null
    blueDriveScore: number | null
    blueTotalScore: number | null
    redTeamCount: number | null
    redMultiplier: number | null
    blueTeamCount: number | null
    blueMultiplier: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchScoresMaxAggregateOutputType = {
    id: string | null
    matchId: string | null
    redAutoScore: number | null
    redDriveScore: number | null
    redTotalScore: number | null
    blueAutoScore: number | null
    blueDriveScore: number | null
    blueTotalScore: number | null
    redTeamCount: number | null
    redMultiplier: number | null
    blueTeamCount: number | null
    blueMultiplier: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MatchScoresCountAggregateOutputType = {
    id: number
    matchId: number
    redAutoScore: number
    redDriveScore: number
    redTotalScore: number
    blueAutoScore: number
    blueDriveScore: number
    blueTotalScore: number
    redGameElements: number
    blueGameElements: number
    redTeamCount: number
    redMultiplier: number
    blueTeamCount: number
    blueMultiplier: number
    scoreDetails: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MatchScoresAvgAggregateInputType = {
    redAutoScore?: true
    redDriveScore?: true
    redTotalScore?: true
    blueAutoScore?: true
    blueDriveScore?: true
    blueTotalScore?: true
    redTeamCount?: true
    redMultiplier?: true
    blueTeamCount?: true
    blueMultiplier?: true
  }

  export type MatchScoresSumAggregateInputType = {
    redAutoScore?: true
    redDriveScore?: true
    redTotalScore?: true
    blueAutoScore?: true
    blueDriveScore?: true
    blueTotalScore?: true
    redTeamCount?: true
    redMultiplier?: true
    blueTeamCount?: true
    blueMultiplier?: true
  }

  export type MatchScoresMinAggregateInputType = {
    id?: true
    matchId?: true
    redAutoScore?: true
    redDriveScore?: true
    redTotalScore?: true
    blueAutoScore?: true
    blueDriveScore?: true
    blueTotalScore?: true
    redTeamCount?: true
    redMultiplier?: true
    blueTeamCount?: true
    blueMultiplier?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchScoresMaxAggregateInputType = {
    id?: true
    matchId?: true
    redAutoScore?: true
    redDriveScore?: true
    redTotalScore?: true
    blueAutoScore?: true
    blueDriveScore?: true
    blueTotalScore?: true
    redTeamCount?: true
    redMultiplier?: true
    blueTeamCount?: true
    blueMultiplier?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MatchScoresCountAggregateInputType = {
    id?: true
    matchId?: true
    redAutoScore?: true
    redDriveScore?: true
    redTotalScore?: true
    blueAutoScore?: true
    blueDriveScore?: true
    blueTotalScore?: true
    redGameElements?: true
    blueGameElements?: true
    redTeamCount?: true
    redMultiplier?: true
    blueTeamCount?: true
    blueMultiplier?: true
    scoreDetails?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MatchScoresAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchScores to aggregate.
     */
    where?: MatchScoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchScores to fetch.
     */
    orderBy?: MatchScoresOrderByWithRelationInput | MatchScoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchScoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchScores
    **/
    _count?: true | MatchScoresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchScoresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchScoresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchScoresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchScoresMaxAggregateInputType
  }

  export type GetMatchScoresAggregateType<T extends MatchScoresAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchScores]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchScores[P]>
      : GetScalarType<T[P], AggregateMatchScores[P]>
  }




  export type MatchScoresGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchScoresWhereInput
    orderBy?: MatchScoresOrderByWithAggregationInput | MatchScoresOrderByWithAggregationInput[]
    by: MatchScoresScalarFieldEnum[] | MatchScoresScalarFieldEnum
    having?: MatchScoresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchScoresCountAggregateInputType | true
    _avg?: MatchScoresAvgAggregateInputType
    _sum?: MatchScoresSumAggregateInputType
    _min?: MatchScoresMinAggregateInputType
    _max?: MatchScoresMaxAggregateInputType
  }

  export type MatchScoresGroupByOutputType = {
    id: string
    matchId: string
    redAutoScore: number
    redDriveScore: number
    redTotalScore: number
    blueAutoScore: number
    blueDriveScore: number
    blueTotalScore: number
    redGameElements: JsonValue | null
    blueGameElements: JsonValue | null
    redTeamCount: number
    redMultiplier: number
    blueTeamCount: number
    blueMultiplier: number
    scoreDetails: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: MatchScoresCountAggregateOutputType | null
    _avg: MatchScoresAvgAggregateOutputType | null
    _sum: MatchScoresSumAggregateOutputType | null
    _min: MatchScoresMinAggregateOutputType | null
    _max: MatchScoresMaxAggregateOutputType | null
  }

  type GetMatchScoresGroupByPayload<T extends MatchScoresGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchScoresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchScoresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchScoresGroupByOutputType[P]>
            : GetScalarType<T[P], MatchScoresGroupByOutputType[P]>
        }
      >
    >


  export type MatchScoresSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    redAutoScore?: boolean
    redDriveScore?: boolean
    redTotalScore?: boolean
    blueAutoScore?: boolean
    blueDriveScore?: boolean
    blueTotalScore?: boolean
    redGameElements?: boolean
    blueGameElements?: boolean
    redTeamCount?: boolean
    redMultiplier?: boolean
    blueTeamCount?: boolean
    blueMultiplier?: boolean
    scoreDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchScores"]>

  export type MatchScoresSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    redAutoScore?: boolean
    redDriveScore?: boolean
    redTotalScore?: boolean
    blueAutoScore?: boolean
    blueDriveScore?: boolean
    blueTotalScore?: boolean
    redGameElements?: boolean
    blueGameElements?: boolean
    redTeamCount?: boolean
    redMultiplier?: boolean
    blueTeamCount?: boolean
    blueMultiplier?: boolean
    scoreDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchScores"]>

  export type MatchScoresSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    matchId?: boolean
    redAutoScore?: boolean
    redDriveScore?: boolean
    redTotalScore?: boolean
    blueAutoScore?: boolean
    blueDriveScore?: boolean
    blueTotalScore?: boolean
    redGameElements?: boolean
    blueGameElements?: boolean
    redTeamCount?: boolean
    redMultiplier?: boolean
    blueTeamCount?: boolean
    blueMultiplier?: boolean
    scoreDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["matchScores"]>

  export type MatchScoresSelectScalar = {
    id?: boolean
    matchId?: boolean
    redAutoScore?: boolean
    redDriveScore?: boolean
    redTotalScore?: boolean
    blueAutoScore?: boolean
    blueDriveScore?: boolean
    blueTotalScore?: boolean
    redGameElements?: boolean
    blueGameElements?: boolean
    redTeamCount?: boolean
    redMultiplier?: boolean
    blueTeamCount?: boolean
    blueMultiplier?: boolean
    scoreDetails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MatchScoresOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "matchId" | "redAutoScore" | "redDriveScore" | "redTotalScore" | "blueAutoScore" | "blueDriveScore" | "blueTotalScore" | "redGameElements" | "blueGameElements" | "redTeamCount" | "redMultiplier" | "blueTeamCount" | "blueMultiplier" | "scoreDetails" | "createdAt" | "updatedAt", ExtArgs["result"]["matchScores"]>
  export type MatchScoresInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type MatchScoresIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }
  export type MatchScoresIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    match?: boolean | MatchDefaultArgs<ExtArgs>
  }

  export type $MatchScoresPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchScores"
    objects: {
      match: Prisma.$MatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      matchId: string
      redAutoScore: number
      redDriveScore: number
      redTotalScore: number
      blueAutoScore: number
      blueDriveScore: number
      blueTotalScore: number
      redGameElements: Prisma.JsonValue | null
      blueGameElements: Prisma.JsonValue | null
      redTeamCount: number
      redMultiplier: number
      blueTeamCount: number
      blueMultiplier: number
      scoreDetails: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["matchScores"]>
    composites: {}
  }

  type MatchScoresGetPayload<S extends boolean | null | undefined | MatchScoresDefaultArgs> = $Result.GetResult<Prisma.$MatchScoresPayload, S>

  type MatchScoresCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchScoresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchScoresCountAggregateInputType | true
    }

  export interface MatchScoresDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchScores'], meta: { name: 'MatchScores' } }
    /**
     * Find zero or one MatchScores that matches the filter.
     * @param {MatchScoresFindUniqueArgs} args - Arguments to find a MatchScores
     * @example
     * // Get one MatchScores
     * const matchScores = await prisma.matchScores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchScoresFindUniqueArgs>(args: SelectSubset<T, MatchScoresFindUniqueArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchScores that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchScoresFindUniqueOrThrowArgs} args - Arguments to find a MatchScores
     * @example
     * // Get one MatchScores
     * const matchScores = await prisma.matchScores.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchScoresFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchScoresFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresFindFirstArgs} args - Arguments to find a MatchScores
     * @example
     * // Get one MatchScores
     * const matchScores = await prisma.matchScores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchScoresFindFirstArgs>(args?: SelectSubset<T, MatchScoresFindFirstArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchScores that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresFindFirstOrThrowArgs} args - Arguments to find a MatchScores
     * @example
     * // Get one MatchScores
     * const matchScores = await prisma.matchScores.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchScoresFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchScoresFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchScores
     * const matchScores = await prisma.matchScores.findMany()
     * 
     * // Get first 10 MatchScores
     * const matchScores = await prisma.matchScores.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchScoresWithIdOnly = await prisma.matchScores.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchScoresFindManyArgs>(args?: SelectSubset<T, MatchScoresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchScores.
     * @param {MatchScoresCreateArgs} args - Arguments to create a MatchScores.
     * @example
     * // Create one MatchScores
     * const MatchScores = await prisma.matchScores.create({
     *   data: {
     *     // ... data to create a MatchScores
     *   }
     * })
     * 
     */
    create<T extends MatchScoresCreateArgs>(args: SelectSubset<T, MatchScoresCreateArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchScores.
     * @param {MatchScoresCreateManyArgs} args - Arguments to create many MatchScores.
     * @example
     * // Create many MatchScores
     * const matchScores = await prisma.matchScores.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchScoresCreateManyArgs>(args?: SelectSubset<T, MatchScoresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchScores and returns the data saved in the database.
     * @param {MatchScoresCreateManyAndReturnArgs} args - Arguments to create many MatchScores.
     * @example
     * // Create many MatchScores
     * const matchScores = await prisma.matchScores.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchScores and only return the `id`
     * const matchScoresWithIdOnly = await prisma.matchScores.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchScoresCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchScoresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchScores.
     * @param {MatchScoresDeleteArgs} args - Arguments to delete one MatchScores.
     * @example
     * // Delete one MatchScores
     * const MatchScores = await prisma.matchScores.delete({
     *   where: {
     *     // ... filter to delete one MatchScores
     *   }
     * })
     * 
     */
    delete<T extends MatchScoresDeleteArgs>(args: SelectSubset<T, MatchScoresDeleteArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchScores.
     * @param {MatchScoresUpdateArgs} args - Arguments to update one MatchScores.
     * @example
     * // Update one MatchScores
     * const matchScores = await prisma.matchScores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchScoresUpdateArgs>(args: SelectSubset<T, MatchScoresUpdateArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchScores.
     * @param {MatchScoresDeleteManyArgs} args - Arguments to filter MatchScores to delete.
     * @example
     * // Delete a few MatchScores
     * const { count } = await prisma.matchScores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchScoresDeleteManyArgs>(args?: SelectSubset<T, MatchScoresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchScores
     * const matchScores = await prisma.matchScores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchScoresUpdateManyArgs>(args: SelectSubset<T, MatchScoresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchScores and returns the data updated in the database.
     * @param {MatchScoresUpdateManyAndReturnArgs} args - Arguments to update many MatchScores.
     * @example
     * // Update many MatchScores
     * const matchScores = await prisma.matchScores.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchScores and only return the `id`
     * const matchScoresWithIdOnly = await prisma.matchScores.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchScoresUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchScoresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchScores.
     * @param {MatchScoresUpsertArgs} args - Arguments to update or create a MatchScores.
     * @example
     * // Update or create a MatchScores
     * const matchScores = await prisma.matchScores.upsert({
     *   create: {
     *     // ... data to create a MatchScores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchScores we want to update
     *   }
     * })
     */
    upsert<T extends MatchScoresUpsertArgs>(args: SelectSubset<T, MatchScoresUpsertArgs<ExtArgs>>): Prisma__MatchScoresClient<$Result.GetResult<Prisma.$MatchScoresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresCountArgs} args - Arguments to filter MatchScores to count.
     * @example
     * // Count the number of MatchScores
     * const count = await prisma.matchScores.count({
     *   where: {
     *     // ... the filter for the MatchScores we want to count
     *   }
     * })
    **/
    count<T extends MatchScoresCountArgs>(
      args?: Subset<T, MatchScoresCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchScoresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchScoresAggregateArgs>(args: Subset<T, MatchScoresAggregateArgs>): Prisma.PrismaPromise<GetMatchScoresAggregateType<T>>

    /**
     * Group by MatchScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchScoresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchScoresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchScoresGroupByArgs['orderBy'] }
        : { orderBy?: MatchScoresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchScoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchScoresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchScores model
   */
  readonly fields: MatchScoresFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchScores.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchScoresClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    match<T extends MatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MatchDefaultArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchScores model
   */
  interface MatchScoresFieldRefs {
    readonly id: FieldRef<"MatchScores", 'String'>
    readonly matchId: FieldRef<"MatchScores", 'String'>
    readonly redAutoScore: FieldRef<"MatchScores", 'Int'>
    readonly redDriveScore: FieldRef<"MatchScores", 'Int'>
    readonly redTotalScore: FieldRef<"MatchScores", 'Int'>
    readonly blueAutoScore: FieldRef<"MatchScores", 'Int'>
    readonly blueDriveScore: FieldRef<"MatchScores", 'Int'>
    readonly blueTotalScore: FieldRef<"MatchScores", 'Int'>
    readonly redGameElements: FieldRef<"MatchScores", 'Json'>
    readonly blueGameElements: FieldRef<"MatchScores", 'Json'>
    readonly redTeamCount: FieldRef<"MatchScores", 'Int'>
    readonly redMultiplier: FieldRef<"MatchScores", 'Float'>
    readonly blueTeamCount: FieldRef<"MatchScores", 'Int'>
    readonly blueMultiplier: FieldRef<"MatchScores", 'Float'>
    readonly scoreDetails: FieldRef<"MatchScores", 'Json'>
    readonly createdAt: FieldRef<"MatchScores", 'DateTime'>
    readonly updatedAt: FieldRef<"MatchScores", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchScores findUnique
   */
  export type MatchScoresFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter, which MatchScores to fetch.
     */
    where: MatchScoresWhereUniqueInput
  }

  /**
   * MatchScores findUniqueOrThrow
   */
  export type MatchScoresFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter, which MatchScores to fetch.
     */
    where: MatchScoresWhereUniqueInput
  }

  /**
   * MatchScores findFirst
   */
  export type MatchScoresFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter, which MatchScores to fetch.
     */
    where?: MatchScoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchScores to fetch.
     */
    orderBy?: MatchScoresOrderByWithRelationInput | MatchScoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchScores.
     */
    cursor?: MatchScoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchScores.
     */
    distinct?: MatchScoresScalarFieldEnum | MatchScoresScalarFieldEnum[]
  }

  /**
   * MatchScores findFirstOrThrow
   */
  export type MatchScoresFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter, which MatchScores to fetch.
     */
    where?: MatchScoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchScores to fetch.
     */
    orderBy?: MatchScoresOrderByWithRelationInput | MatchScoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchScores.
     */
    cursor?: MatchScoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchScores.
     */
    distinct?: MatchScoresScalarFieldEnum | MatchScoresScalarFieldEnum[]
  }

  /**
   * MatchScores findMany
   */
  export type MatchScoresFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter, which MatchScores to fetch.
     */
    where?: MatchScoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchScores to fetch.
     */
    orderBy?: MatchScoresOrderByWithRelationInput | MatchScoresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchScores.
     */
    cursor?: MatchScoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchScores.
     */
    skip?: number
    distinct?: MatchScoresScalarFieldEnum | MatchScoresScalarFieldEnum[]
  }

  /**
   * MatchScores create
   */
  export type MatchScoresCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * The data needed to create a MatchScores.
     */
    data: XOR<MatchScoresCreateInput, MatchScoresUncheckedCreateInput>
  }

  /**
   * MatchScores createMany
   */
  export type MatchScoresCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchScores.
     */
    data: MatchScoresCreateManyInput | MatchScoresCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchScores createManyAndReturn
   */
  export type MatchScoresCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * The data used to create many MatchScores.
     */
    data: MatchScoresCreateManyInput | MatchScoresCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchScores update
   */
  export type MatchScoresUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * The data needed to update a MatchScores.
     */
    data: XOR<MatchScoresUpdateInput, MatchScoresUncheckedUpdateInput>
    /**
     * Choose, which MatchScores to update.
     */
    where: MatchScoresWhereUniqueInput
  }

  /**
   * MatchScores updateMany
   */
  export type MatchScoresUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchScores.
     */
    data: XOR<MatchScoresUpdateManyMutationInput, MatchScoresUncheckedUpdateManyInput>
    /**
     * Filter which MatchScores to update
     */
    where?: MatchScoresWhereInput
    /**
     * Limit how many MatchScores to update.
     */
    limit?: number
  }

  /**
   * MatchScores updateManyAndReturn
   */
  export type MatchScoresUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * The data used to update MatchScores.
     */
    data: XOR<MatchScoresUpdateManyMutationInput, MatchScoresUncheckedUpdateManyInput>
    /**
     * Filter which MatchScores to update
     */
    where?: MatchScoresWhereInput
    /**
     * Limit how many MatchScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MatchScores upsert
   */
  export type MatchScoresUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * The filter to search for the MatchScores to update in case it exists.
     */
    where: MatchScoresWhereUniqueInput
    /**
     * In case the MatchScores found by the `where` argument doesn't exist, create a new MatchScores with this data.
     */
    create: XOR<MatchScoresCreateInput, MatchScoresUncheckedCreateInput>
    /**
     * In case the MatchScores was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchScoresUpdateInput, MatchScoresUncheckedUpdateInput>
  }

  /**
   * MatchScores delete
   */
  export type MatchScoresDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
    /**
     * Filter which MatchScores to delete.
     */
    where: MatchScoresWhereUniqueInput
  }

  /**
   * MatchScores deleteMany
   */
  export type MatchScoresDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchScores to delete
     */
    where?: MatchScoresWhereInput
    /**
     * Limit how many MatchScores to delete.
     */
    limit?: number
  }

  /**
   * MatchScores without action
   */
  export type MatchScoresDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchScores
     */
    select?: MatchScoresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchScores
     */
    omit?: MatchScoresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchScoresInclude<ExtArgs> | null
  }


  /**
   * Model TeamStats
   */

  export type AggregateTeamStats = {
    _count: TeamStatsCountAggregateOutputType | null
    _avg: TeamStatsAvgAggregateOutputType | null
    _sum: TeamStatsSumAggregateOutputType | null
    _min: TeamStatsMinAggregateOutputType | null
    _max: TeamStatsMaxAggregateOutputType | null
  }

  export type TeamStatsAvgAggregateOutputType = {
    wins: number | null
    losses: number | null
    ties: number | null
    matchesPlayed: number | null
    rank: number | null
    tiebreaker1: number | null
    tiebreaker2: number | null
  }

  export type TeamStatsSumAggregateOutputType = {
    wins: number | null
    losses: number | null
    ties: number | null
    matchesPlayed: number | null
    rank: number | null
    tiebreaker1: number | null
    tiebreaker2: number | null
  }

  export type TeamStatsMinAggregateOutputType = {
    id: string | null
    teamId: string | null
    tournamentId: string | null
    stageId: string | null
    wins: number | null
    losses: number | null
    ties: number | null
    matchesPlayed: number | null
    rank: number | null
    tiebreaker1: number | null
    tiebreaker2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamStatsMaxAggregateOutputType = {
    id: string | null
    teamId: string | null
    tournamentId: string | null
    stageId: string | null
    wins: number | null
    losses: number | null
    ties: number | null
    matchesPlayed: number | null
    rank: number | null
    tiebreaker1: number | null
    tiebreaker2: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeamStatsCountAggregateOutputType = {
    id: number
    teamId: number
    tournamentId: number
    stageId: number
    wins: number
    losses: number
    ties: number
    matchesPlayed: number
    rank: number
    tiebreaker1: number
    tiebreaker2: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeamStatsAvgAggregateInputType = {
    wins?: true
    losses?: true
    ties?: true
    matchesPlayed?: true
    rank?: true
    tiebreaker1?: true
    tiebreaker2?: true
  }

  export type TeamStatsSumAggregateInputType = {
    wins?: true
    losses?: true
    ties?: true
    matchesPlayed?: true
    rank?: true
    tiebreaker1?: true
    tiebreaker2?: true
  }

  export type TeamStatsMinAggregateInputType = {
    id?: true
    teamId?: true
    tournamentId?: true
    stageId?: true
    wins?: true
    losses?: true
    ties?: true
    matchesPlayed?: true
    rank?: true
    tiebreaker1?: true
    tiebreaker2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamStatsMaxAggregateInputType = {
    id?: true
    teamId?: true
    tournamentId?: true
    stageId?: true
    wins?: true
    losses?: true
    ties?: true
    matchesPlayed?: true
    rank?: true
    tiebreaker1?: true
    tiebreaker2?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeamStatsCountAggregateInputType = {
    id?: true
    teamId?: true
    tournamentId?: true
    stageId?: true
    wins?: true
    losses?: true
    ties?: true
    matchesPlayed?: true
    rank?: true
    tiebreaker1?: true
    tiebreaker2?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeamStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamStats to aggregate.
     */
    where?: TeamStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamStats to fetch.
     */
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamStats
    **/
    _count?: true | TeamStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamStatsMaxAggregateInputType
  }

  export type GetTeamStatsAggregateType<T extends TeamStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamStats[P]>
      : GetScalarType<T[P], AggregateTeamStats[P]>
  }




  export type TeamStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamStatsWhereInput
    orderBy?: TeamStatsOrderByWithAggregationInput | TeamStatsOrderByWithAggregationInput[]
    by: TeamStatsScalarFieldEnum[] | TeamStatsScalarFieldEnum
    having?: TeamStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamStatsCountAggregateInputType | true
    _avg?: TeamStatsAvgAggregateInputType
    _sum?: TeamStatsSumAggregateInputType
    _min?: TeamStatsMinAggregateInputType
    _max?: TeamStatsMaxAggregateInputType
  }

  export type TeamStatsGroupByOutputType = {
    id: string
    teamId: string
    tournamentId: string
    stageId: string | null
    wins: number
    losses: number
    ties: number
    matchesPlayed: number
    rank: number | null
    tiebreaker1: number
    tiebreaker2: number
    createdAt: Date
    updatedAt: Date
    _count: TeamStatsCountAggregateOutputType | null
    _avg: TeamStatsAvgAggregateOutputType | null
    _sum: TeamStatsSumAggregateOutputType | null
    _min: TeamStatsMinAggregateOutputType | null
    _max: TeamStatsMaxAggregateOutputType | null
  }

  type GetTeamStatsGroupByPayload<T extends TeamStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamStatsGroupByOutputType[P]>
            : GetScalarType<T[P], TeamStatsGroupByOutputType[P]>
        }
      >
    >


  export type TeamStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    tournamentId?: boolean
    stageId?: boolean
    wins?: boolean
    losses?: boolean
    ties?: boolean
    matchesPlayed?: boolean
    rank?: boolean
    tiebreaker1?: boolean
    tiebreaker2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }, ExtArgs["result"]["teamStats"]>

  export type TeamStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    tournamentId?: boolean
    stageId?: boolean
    wins?: boolean
    losses?: boolean
    ties?: boolean
    matchesPlayed?: boolean
    rank?: boolean
    tiebreaker1?: boolean
    tiebreaker2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }, ExtArgs["result"]["teamStats"]>

  export type TeamStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamId?: boolean
    tournamentId?: boolean
    stageId?: boolean
    wins?: boolean
    losses?: boolean
    ties?: boolean
    matchesPlayed?: boolean
    rank?: boolean
    tiebreaker1?: boolean
    tiebreaker2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }, ExtArgs["result"]["teamStats"]>

  export type TeamStatsSelectScalar = {
    id?: boolean
    teamId?: boolean
    tournamentId?: boolean
    stageId?: boolean
    wins?: boolean
    losses?: boolean
    ties?: boolean
    matchesPlayed?: boolean
    rank?: boolean
    tiebreaker1?: boolean
    tiebreaker2?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeamStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamId" | "tournamentId" | "stageId" | "wins" | "losses" | "ties" | "matchesPlayed" | "rank" | "tiebreaker1" | "tiebreaker2" | "createdAt" | "updatedAt", ExtArgs["result"]["teamStats"]>
  export type TeamStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }
  export type TeamStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }
  export type TeamStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    team?: boolean | TeamDefaultArgs<ExtArgs>
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    stage?: boolean | TeamStats$stageArgs<ExtArgs>
  }

  export type $TeamStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamStats"
    objects: {
      team: Prisma.$TeamPayload<ExtArgs>
      tournament: Prisma.$TournamentPayload<ExtArgs>
      stage: Prisma.$StagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      teamId: string
      tournamentId: string
      stageId: string | null
      wins: number
      losses: number
      ties: number
      matchesPlayed: number
      rank: number | null
      tiebreaker1: number
      tiebreaker2: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teamStats"]>
    composites: {}
  }

  type TeamStatsGetPayload<S extends boolean | null | undefined | TeamStatsDefaultArgs> = $Result.GetResult<Prisma.$TeamStatsPayload, S>

  type TeamStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamStatsCountAggregateInputType | true
    }

  export interface TeamStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamStats'], meta: { name: 'TeamStats' } }
    /**
     * Find zero or one TeamStats that matches the filter.
     * @param {TeamStatsFindUniqueArgs} args - Arguments to find a TeamStats
     * @example
     * // Get one TeamStats
     * const teamStats = await prisma.teamStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamStatsFindUniqueArgs>(args: SelectSubset<T, TeamStatsFindUniqueArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamStatsFindUniqueOrThrowArgs} args - Arguments to find a TeamStats
     * @example
     * // Get one TeamStats
     * const teamStats = await prisma.teamStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsFindFirstArgs} args - Arguments to find a TeamStats
     * @example
     * // Get one TeamStats
     * const teamStats = await prisma.teamStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamStatsFindFirstArgs>(args?: SelectSubset<T, TeamStatsFindFirstArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsFindFirstOrThrowArgs} args - Arguments to find a TeamStats
     * @example
     * // Get one TeamStats
     * const teamStats = await prisma.teamStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamStats
     * const teamStats = await prisma.teamStats.findMany()
     * 
     * // Get first 10 TeamStats
     * const teamStats = await prisma.teamStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamStatsWithIdOnly = await prisma.teamStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamStatsFindManyArgs>(args?: SelectSubset<T, TeamStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamStats.
     * @param {TeamStatsCreateArgs} args - Arguments to create a TeamStats.
     * @example
     * // Create one TeamStats
     * const TeamStats = await prisma.teamStats.create({
     *   data: {
     *     // ... data to create a TeamStats
     *   }
     * })
     * 
     */
    create<T extends TeamStatsCreateArgs>(args: SelectSubset<T, TeamStatsCreateArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamStats.
     * @param {TeamStatsCreateManyArgs} args - Arguments to create many TeamStats.
     * @example
     * // Create many TeamStats
     * const teamStats = await prisma.teamStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamStatsCreateManyArgs>(args?: SelectSubset<T, TeamStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamStats and returns the data saved in the database.
     * @param {TeamStatsCreateManyAndReturnArgs} args - Arguments to create many TeamStats.
     * @example
     * // Create many TeamStats
     * const teamStats = await prisma.teamStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamStats and only return the `id`
     * const teamStatsWithIdOnly = await prisma.teamStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamStats.
     * @param {TeamStatsDeleteArgs} args - Arguments to delete one TeamStats.
     * @example
     * // Delete one TeamStats
     * const TeamStats = await prisma.teamStats.delete({
     *   where: {
     *     // ... filter to delete one TeamStats
     *   }
     * })
     * 
     */
    delete<T extends TeamStatsDeleteArgs>(args: SelectSubset<T, TeamStatsDeleteArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamStats.
     * @param {TeamStatsUpdateArgs} args - Arguments to update one TeamStats.
     * @example
     * // Update one TeamStats
     * const teamStats = await prisma.teamStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamStatsUpdateArgs>(args: SelectSubset<T, TeamStatsUpdateArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamStats.
     * @param {TeamStatsDeleteManyArgs} args - Arguments to filter TeamStats to delete.
     * @example
     * // Delete a few TeamStats
     * const { count } = await prisma.teamStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamStatsDeleteManyArgs>(args?: SelectSubset<T, TeamStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamStats
     * const teamStats = await prisma.teamStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamStatsUpdateManyArgs>(args: SelectSubset<T, TeamStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamStats and returns the data updated in the database.
     * @param {TeamStatsUpdateManyAndReturnArgs} args - Arguments to update many TeamStats.
     * @example
     * // Update many TeamStats
     * const teamStats = await prisma.teamStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamStats and only return the `id`
     * const teamStatsWithIdOnly = await prisma.teamStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamStats.
     * @param {TeamStatsUpsertArgs} args - Arguments to update or create a TeamStats.
     * @example
     * // Update or create a TeamStats
     * const teamStats = await prisma.teamStats.upsert({
     *   create: {
     *     // ... data to create a TeamStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamStats we want to update
     *   }
     * })
     */
    upsert<T extends TeamStatsUpsertArgs>(args: SelectSubset<T, TeamStatsUpsertArgs<ExtArgs>>): Prisma__TeamStatsClient<$Result.GetResult<Prisma.$TeamStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsCountArgs} args - Arguments to filter TeamStats to count.
     * @example
     * // Count the number of TeamStats
     * const count = await prisma.teamStats.count({
     *   where: {
     *     // ... the filter for the TeamStats we want to count
     *   }
     * })
    **/
    count<T extends TeamStatsCountArgs>(
      args?: Subset<T, TeamStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamStatsAggregateArgs>(args: Subset<T, TeamStatsAggregateArgs>): Prisma.PrismaPromise<GetTeamStatsAggregateType<T>>

    /**
     * Group by TeamStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamStatsGroupByArgs['orderBy'] }
        : { orderBy?: TeamStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamStats model
   */
  readonly fields: TeamStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stage<T extends TeamStats$stageArgs<ExtArgs> = {}>(args?: Subset<T, TeamStats$stageArgs<ExtArgs>>): Prisma__StageClient<$Result.GetResult<Prisma.$StagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamStats model
   */
  interface TeamStatsFieldRefs {
    readonly id: FieldRef<"TeamStats", 'String'>
    readonly teamId: FieldRef<"TeamStats", 'String'>
    readonly tournamentId: FieldRef<"TeamStats", 'String'>
    readonly stageId: FieldRef<"TeamStats", 'String'>
    readonly wins: FieldRef<"TeamStats", 'Int'>
    readonly losses: FieldRef<"TeamStats", 'Int'>
    readonly ties: FieldRef<"TeamStats", 'Int'>
    readonly matchesPlayed: FieldRef<"TeamStats", 'Int'>
    readonly rank: FieldRef<"TeamStats", 'Int'>
    readonly tiebreaker1: FieldRef<"TeamStats", 'Float'>
    readonly tiebreaker2: FieldRef<"TeamStats", 'Float'>
    readonly createdAt: FieldRef<"TeamStats", 'DateTime'>
    readonly updatedAt: FieldRef<"TeamStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamStats findUnique
   */
  export type TeamStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter, which TeamStats to fetch.
     */
    where: TeamStatsWhereUniqueInput
  }

  /**
   * TeamStats findUniqueOrThrow
   */
  export type TeamStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter, which TeamStats to fetch.
     */
    where: TeamStatsWhereUniqueInput
  }

  /**
   * TeamStats findFirst
   */
  export type TeamStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter, which TeamStats to fetch.
     */
    where?: TeamStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamStats to fetch.
     */
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamStats.
     */
    cursor?: TeamStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamStats.
     */
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * TeamStats findFirstOrThrow
   */
  export type TeamStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter, which TeamStats to fetch.
     */
    where?: TeamStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamStats to fetch.
     */
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamStats.
     */
    cursor?: TeamStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamStats.
     */
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * TeamStats findMany
   */
  export type TeamStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter, which TeamStats to fetch.
     */
    where?: TeamStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamStats to fetch.
     */
    orderBy?: TeamStatsOrderByWithRelationInput | TeamStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamStats.
     */
    cursor?: TeamStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamStats.
     */
    skip?: number
    distinct?: TeamStatsScalarFieldEnum | TeamStatsScalarFieldEnum[]
  }

  /**
   * TeamStats create
   */
  export type TeamStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamStats.
     */
    data: XOR<TeamStatsCreateInput, TeamStatsUncheckedCreateInput>
  }

  /**
   * TeamStats createMany
   */
  export type TeamStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamStats.
     */
    data: TeamStatsCreateManyInput | TeamStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamStats createManyAndReturn
   */
  export type TeamStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * The data used to create many TeamStats.
     */
    data: TeamStatsCreateManyInput | TeamStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamStats update
   */
  export type TeamStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamStats.
     */
    data: XOR<TeamStatsUpdateInput, TeamStatsUncheckedUpdateInput>
    /**
     * Choose, which TeamStats to update.
     */
    where: TeamStatsWhereUniqueInput
  }

  /**
   * TeamStats updateMany
   */
  export type TeamStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamStats.
     */
    data: XOR<TeamStatsUpdateManyMutationInput, TeamStatsUncheckedUpdateManyInput>
    /**
     * Filter which TeamStats to update
     */
    where?: TeamStatsWhereInput
    /**
     * Limit how many TeamStats to update.
     */
    limit?: number
  }

  /**
   * TeamStats updateManyAndReturn
   */
  export type TeamStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * The data used to update TeamStats.
     */
    data: XOR<TeamStatsUpdateManyMutationInput, TeamStatsUncheckedUpdateManyInput>
    /**
     * Filter which TeamStats to update
     */
    where?: TeamStatsWhereInput
    /**
     * Limit how many TeamStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamStats upsert
   */
  export type TeamStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamStats to update in case it exists.
     */
    where: TeamStatsWhereUniqueInput
    /**
     * In case the TeamStats found by the `where` argument doesn't exist, create a new TeamStats with this data.
     */
    create: XOR<TeamStatsCreateInput, TeamStatsUncheckedCreateInput>
    /**
     * In case the TeamStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamStatsUpdateInput, TeamStatsUncheckedUpdateInput>
  }

  /**
   * TeamStats delete
   */
  export type TeamStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
    /**
     * Filter which TeamStats to delete.
     */
    where: TeamStatsWhereUniqueInput
  }

  /**
   * TeamStats deleteMany
   */
  export type TeamStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamStats to delete
     */
    where?: TeamStatsWhereInput
    /**
     * Limit how many TeamStats to delete.
     */
    limit?: number
  }

  /**
   * TeamStats.stage
   */
  export type TeamStats$stageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stage
     */
    select?: StageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stage
     */
    omit?: StageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StageInclude<ExtArgs> | null
    where?: StageWhereInput
  }

  /**
   * TeamStats without action
   */
  export type TeamStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamStats
     */
    select?: TeamStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamStats
     */
    omit?: TeamStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamStatsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    email: 'email',
    gender: 'gender',
    DateOfBirth: 'DateOfBirth',
    phoneNumber: 'phoneNumber',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TournamentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    adminId: 'adminId'
  };

  export type TournamentScalarFieldEnum = (typeof TournamentScalarFieldEnum)[keyof typeof TournamentScalarFieldEnum]


  export const StageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    startDate: 'startDate',
    endDate: 'endDate',
    tournamentId: 'tournamentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StageScalarFieldEnum = (typeof StageScalarFieldEnum)[keyof typeof StageScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    matchNumber: 'matchNumber',
    roundNumber: 'roundNumber',
    status: 'status',
    startTime: 'startTime',
    scheduledTime: 'scheduledTime',
    endTime: 'endTime',
    duration: 'duration',
    winningAlliance: 'winningAlliance',
    stageId: 'stageId',
    scoredById: 'scoredById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const MatchRefereeScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    userId: 'userId',
    role: 'role',
    position: 'position',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MatchRefereeScalarFieldEnum = (typeof MatchRefereeScalarFieldEnum)[keyof typeof MatchRefereeScalarFieldEnum]


  export const AllianceScalarFieldEnum: {
    id: 'id',
    color: 'color',
    score: 'score',
    matchId: 'matchId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AllianceScalarFieldEnum = (typeof AllianceScalarFieldEnum)[keyof typeof AllianceScalarFieldEnum]


  export const AllianceScoringScalarFieldEnum: {
    id: 'id',
    allianceId: 'allianceId',
    refereeId: 'refereeId',
    scoreDetails: 'scoreDetails',
    card: 'card',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AllianceScoringScalarFieldEnum = (typeof AllianceScoringScalarFieldEnum)[keyof typeof AllianceScoringScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    teamNumber: 'teamNumber',
    name: 'name',
    organization: 'organization',
    avatar: 'avatar',
    description: 'description',
    teamMembers: 'teamMembers',
    tournamentId: 'tournamentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamAllianceScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    allianceId: 'allianceId',
    stationPosition: 'stationPosition',
    isSurrogate: 'isSurrogate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamAllianceScalarFieldEnum = (typeof TeamAllianceScalarFieldEnum)[keyof typeof TeamAllianceScalarFieldEnum]


  export const MatchScoresScalarFieldEnum: {
    id: 'id',
    matchId: 'matchId',
    redAutoScore: 'redAutoScore',
    redDriveScore: 'redDriveScore',
    redTotalScore: 'redTotalScore',
    blueAutoScore: 'blueAutoScore',
    blueDriveScore: 'blueDriveScore',
    blueTotalScore: 'blueTotalScore',
    redGameElements: 'redGameElements',
    blueGameElements: 'blueGameElements',
    redTeamCount: 'redTeamCount',
    redMultiplier: 'redMultiplier',
    blueTeamCount: 'blueTeamCount',
    blueMultiplier: 'blueMultiplier',
    scoreDetails: 'scoreDetails',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MatchScoresScalarFieldEnum = (typeof MatchScoresScalarFieldEnum)[keyof typeof MatchScoresScalarFieldEnum]


  export const TeamStatsScalarFieldEnum: {
    id: 'id',
    teamId: 'teamId',
    tournamentId: 'tournamentId',
    stageId: 'stageId',
    wins: 'wins',
    losses: 'losses',
    ties: 'ties',
    matchesPlayed: 'matchesPlayed',
    rank: 'rank',
    tiebreaker1: 'tiebreaker1',
    tiebreaker2: 'tiebreaker2',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeamStatsScalarFieldEnum = (typeof TeamStatsScalarFieldEnum)[keyof typeof TeamStatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StageType'
   */
  export type EnumStageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StageType'>
    


  /**
   * Reference to a field of type 'StageType[]'
   */
  export type ListEnumStageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StageType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RefereeRole'
   */
  export type EnumRefereeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefereeRole'>
    


  /**
   * Reference to a field of type 'RefereeRole[]'
   */
  export type ListEnumRefereeRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RefereeRole[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'CardType'
   */
  export type EnumCardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardType'>
    


  /**
   * Reference to a field of type 'CardType[]'
   */
  export type ListEnumCardTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CardType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    email?: StringNullableFilter<"User"> | string | null
    gender?: BoolNullableFilter<"User"> | boolean | null
    DateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdById?: StringNullableFilter<"User"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    tournaments?: TournamentListRelationFilter
    scoredMatches?: MatchListRelationFilter
    allianceRefFor?: AllianceScoringListRelationFilter
    matchReferees?: MatchRefereeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    DateOfBirth?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    createdUsers?: UserOrderByRelationAggregateInput
    tournaments?: TournamentOrderByRelationAggregateInput
    scoredMatches?: MatchOrderByRelationAggregateInput
    allianceRefFor?: AllianceScoringOrderByRelationAggregateInput
    matchReferees?: MatchRefereeOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    gender?: BoolNullableFilter<"User"> | boolean | null
    DateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdById?: StringNullableFilter<"User"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdUsers?: UserListRelationFilter
    tournaments?: TournamentListRelationFilter
    scoredMatches?: MatchListRelationFilter
    allianceRefFor?: AllianceScoringListRelationFilter
    matchReferees?: MatchRefereeListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    DateOfBirth?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    gender?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    DateOfBirth?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type TournamentWhereInput = {
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    id?: StringFilter<"Tournament"> | string
    name?: StringFilter<"Tournament"> | string
    description?: StringNullableFilter<"Tournament"> | string | null
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    endDate?: DateTimeFilter<"Tournament"> | Date | string
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    adminId?: StringFilter<"Tournament"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    stages?: StageListRelationFilter
    teams?: TeamListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }

  export type TournamentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    admin?: UserOrderByWithRelationInput
    stages?: StageOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
    teamStats?: TeamStatsOrderByRelationAggregateInput
  }

  export type TournamentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    name?: StringFilter<"Tournament"> | string
    description?: StringNullableFilter<"Tournament"> | string | null
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    endDate?: DateTimeFilter<"Tournament"> | Date | string
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    adminId?: StringFilter<"Tournament"> | string
    admin?: XOR<UserScalarRelationFilter, UserWhereInput>
    stages?: StageListRelationFilter
    teams?: TeamListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }, "id">

  export type TournamentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
    _count?: TournamentCountOrderByAggregateInput
    _max?: TournamentMaxOrderByAggregateInput
    _min?: TournamentMinOrderByAggregateInput
  }

  export type TournamentScalarWhereWithAggregatesInput = {
    AND?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    OR?: TournamentScalarWhereWithAggregatesInput[]
    NOT?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tournament"> | string
    name?: StringWithAggregatesFilter<"Tournament"> | string
    description?: StringNullableWithAggregatesFilter<"Tournament"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    adminId?: StringWithAggregatesFilter<"Tournament"> | string
  }

  export type StageWhereInput = {
    AND?: StageWhereInput | StageWhereInput[]
    OR?: StageWhereInput[]
    NOT?: StageWhereInput | StageWhereInput[]
    id?: StringFilter<"Stage"> | string
    name?: StringFilter<"Stage"> | string
    type?: EnumStageTypeFilter<"Stage"> | $Enums.StageType
    startDate?: DateTimeFilter<"Stage"> | Date | string
    endDate?: DateTimeFilter<"Stage"> | Date | string
    tournamentId?: StringFilter<"Stage"> | string
    createdAt?: DateTimeFilter<"Stage"> | Date | string
    updatedAt?: DateTimeFilter<"Stage"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    matches?: MatchListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }

  export type StageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    matches?: MatchOrderByRelationAggregateInput
    teamStats?: TeamStatsOrderByRelationAggregateInput
  }

  export type StageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StageWhereInput | StageWhereInput[]
    OR?: StageWhereInput[]
    NOT?: StageWhereInput | StageWhereInput[]
    name?: StringFilter<"Stage"> | string
    type?: EnumStageTypeFilter<"Stage"> | $Enums.StageType
    startDate?: DateTimeFilter<"Stage"> | Date | string
    endDate?: DateTimeFilter<"Stage"> | Date | string
    tournamentId?: StringFilter<"Stage"> | string
    createdAt?: DateTimeFilter<"Stage"> | Date | string
    updatedAt?: DateTimeFilter<"Stage"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    matches?: MatchListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }, "id">

  export type StageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StageCountOrderByAggregateInput
    _max?: StageMaxOrderByAggregateInput
    _min?: StageMinOrderByAggregateInput
  }

  export type StageScalarWhereWithAggregatesInput = {
    AND?: StageScalarWhereWithAggregatesInput | StageScalarWhereWithAggregatesInput[]
    OR?: StageScalarWhereWithAggregatesInput[]
    NOT?: StageScalarWhereWithAggregatesInput | StageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stage"> | string
    name?: StringWithAggregatesFilter<"Stage"> | string
    type?: EnumStageTypeWithAggregatesFilter<"Stage"> | $Enums.StageType
    startDate?: DateTimeWithAggregatesFilter<"Stage"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Stage"> | Date | string
    tournamentId?: StringWithAggregatesFilter<"Stage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stage"> | Date | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: StringFilter<"Match"> | string
    matchNumber?: IntFilter<"Match"> | number
    roundNumber?: IntNullableFilter<"Match"> | number | null
    status?: StringFilter<"Match"> | string
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    scheduledTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    duration?: IntNullableFilter<"Match"> | number | null
    winningAlliance?: StringNullableFilter<"Match"> | string | null
    stageId?: StringFilter<"Match"> | string
    scoredById?: StringNullableFilter<"Match"> | string | null
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    stage?: XOR<StageScalarRelationFilter, StageWhereInput>
    alliances?: AllianceListRelationFilter
    scoredBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referees?: MatchRefereeListRelationFilter
    matchScores?: XOR<MatchScoresNullableScalarRelationFilter, MatchScoresWhereInput> | null
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    matchNumber?: SortOrder
    roundNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    scheduledTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    winningAlliance?: SortOrderInput | SortOrder
    stageId?: SortOrder
    scoredById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stage?: StageOrderByWithRelationInput
    alliances?: AllianceOrderByRelationAggregateInput
    scoredBy?: UserOrderByWithRelationInput
    referees?: MatchRefereeOrderByRelationAggregateInput
    matchScores?: MatchScoresOrderByWithRelationInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    matchNumber?: IntFilter<"Match"> | number
    roundNumber?: IntNullableFilter<"Match"> | number | null
    status?: StringFilter<"Match"> | string
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    scheduledTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    duration?: IntNullableFilter<"Match"> | number | null
    winningAlliance?: StringNullableFilter<"Match"> | string | null
    stageId?: StringFilter<"Match"> | string
    scoredById?: StringNullableFilter<"Match"> | string | null
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
    stage?: XOR<StageScalarRelationFilter, StageWhereInput>
    alliances?: AllianceListRelationFilter
    scoredBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    referees?: MatchRefereeListRelationFilter
    matchScores?: XOR<MatchScoresNullableScalarRelationFilter, MatchScoresWhereInput> | null
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    matchNumber?: SortOrder
    roundNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    startTime?: SortOrderInput | SortOrder
    scheduledTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    winningAlliance?: SortOrderInput | SortOrder
    stageId?: SortOrder
    scoredById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Match"> | string
    matchNumber?: IntWithAggregatesFilter<"Match"> | number
    roundNumber?: IntNullableWithAggregatesFilter<"Match"> | number | null
    status?: StringWithAggregatesFilter<"Match"> | string
    startTime?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    scheduledTime?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableWithAggregatesFilter<"Match"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"Match"> | number | null
    winningAlliance?: StringNullableWithAggregatesFilter<"Match"> | string | null
    stageId?: StringWithAggregatesFilter<"Match"> | string
    scoredById?: StringNullableWithAggregatesFilter<"Match"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
  }

  export type MatchRefereeWhereInput = {
    AND?: MatchRefereeWhereInput | MatchRefereeWhereInput[]
    OR?: MatchRefereeWhereInput[]
    NOT?: MatchRefereeWhereInput | MatchRefereeWhereInput[]
    id?: StringFilter<"MatchReferee"> | string
    matchId?: StringFilter<"MatchReferee"> | string
    userId?: StringFilter<"MatchReferee"> | string
    role?: EnumRefereeRoleFilter<"MatchReferee"> | $Enums.RefereeRole
    position?: StringNullableFilter<"MatchReferee"> | string | null
    createdAt?: DateTimeFilter<"MatchReferee"> | Date | string
    updatedAt?: DateTimeFilter<"MatchReferee"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MatchRefereeOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type MatchRefereeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matchId_userId?: MatchRefereeMatchIdUserIdCompoundUniqueInput
    AND?: MatchRefereeWhereInput | MatchRefereeWhereInput[]
    OR?: MatchRefereeWhereInput[]
    NOT?: MatchRefereeWhereInput | MatchRefereeWhereInput[]
    matchId?: StringFilter<"MatchReferee"> | string
    userId?: StringFilter<"MatchReferee"> | string
    role?: EnumRefereeRoleFilter<"MatchReferee"> | $Enums.RefereeRole
    position?: StringNullableFilter<"MatchReferee"> | string | null
    createdAt?: DateTimeFilter<"MatchReferee"> | Date | string
    updatedAt?: DateTimeFilter<"MatchReferee"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "matchId_userId">

  export type MatchRefereeOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    position?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MatchRefereeCountOrderByAggregateInput
    _max?: MatchRefereeMaxOrderByAggregateInput
    _min?: MatchRefereeMinOrderByAggregateInput
  }

  export type MatchRefereeScalarWhereWithAggregatesInput = {
    AND?: MatchRefereeScalarWhereWithAggregatesInput | MatchRefereeScalarWhereWithAggregatesInput[]
    OR?: MatchRefereeScalarWhereWithAggregatesInput[]
    NOT?: MatchRefereeScalarWhereWithAggregatesInput | MatchRefereeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchReferee"> | string
    matchId?: StringWithAggregatesFilter<"MatchReferee"> | string
    userId?: StringWithAggregatesFilter<"MatchReferee"> | string
    role?: EnumRefereeRoleWithAggregatesFilter<"MatchReferee"> | $Enums.RefereeRole
    position?: StringNullableWithAggregatesFilter<"MatchReferee"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MatchReferee"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MatchReferee"> | Date | string
  }

  export type AllianceWhereInput = {
    AND?: AllianceWhereInput | AllianceWhereInput[]
    OR?: AllianceWhereInput[]
    NOT?: AllianceWhereInput | AllianceWhereInput[]
    id?: StringFilter<"Alliance"> | string
    color?: StringFilter<"Alliance"> | string
    score?: IntFilter<"Alliance"> | number
    matchId?: StringFilter<"Alliance"> | string
    createdAt?: DateTimeFilter<"Alliance"> | Date | string
    updatedAt?: DateTimeFilter<"Alliance"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    teamAlliances?: TeamAllianceListRelationFilter
    allianceScoring?: XOR<AllianceScoringNullableScalarRelationFilter, AllianceScoringWhereInput> | null
  }

  export type AllianceOrderByWithRelationInput = {
    id?: SortOrder
    color?: SortOrder
    score?: SortOrder
    matchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
    teamAlliances?: TeamAllianceOrderByRelationAggregateInput
    allianceScoring?: AllianceScoringOrderByWithRelationInput
  }

  export type AllianceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AllianceWhereInput | AllianceWhereInput[]
    OR?: AllianceWhereInput[]
    NOT?: AllianceWhereInput | AllianceWhereInput[]
    color?: StringFilter<"Alliance"> | string
    score?: IntFilter<"Alliance"> | number
    matchId?: StringFilter<"Alliance"> | string
    createdAt?: DateTimeFilter<"Alliance"> | Date | string
    updatedAt?: DateTimeFilter<"Alliance"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
    teamAlliances?: TeamAllianceListRelationFilter
    allianceScoring?: XOR<AllianceScoringNullableScalarRelationFilter, AllianceScoringWhereInput> | null
  }, "id">

  export type AllianceOrderByWithAggregationInput = {
    id?: SortOrder
    color?: SortOrder
    score?: SortOrder
    matchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AllianceCountOrderByAggregateInput
    _avg?: AllianceAvgOrderByAggregateInput
    _max?: AllianceMaxOrderByAggregateInput
    _min?: AllianceMinOrderByAggregateInput
    _sum?: AllianceSumOrderByAggregateInput
  }

  export type AllianceScalarWhereWithAggregatesInput = {
    AND?: AllianceScalarWhereWithAggregatesInput | AllianceScalarWhereWithAggregatesInput[]
    OR?: AllianceScalarWhereWithAggregatesInput[]
    NOT?: AllianceScalarWhereWithAggregatesInput | AllianceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alliance"> | string
    color?: StringWithAggregatesFilter<"Alliance"> | string
    score?: IntWithAggregatesFilter<"Alliance"> | number
    matchId?: StringWithAggregatesFilter<"Alliance"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Alliance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Alliance"> | Date | string
  }

  export type AllianceScoringWhereInput = {
    AND?: AllianceScoringWhereInput | AllianceScoringWhereInput[]
    OR?: AllianceScoringWhereInput[]
    NOT?: AllianceScoringWhereInput | AllianceScoringWhereInput[]
    id?: StringFilter<"AllianceScoring"> | string
    allianceId?: StringFilter<"AllianceScoring"> | string
    refereeId?: StringNullableFilter<"AllianceScoring"> | string | null
    scoreDetails?: JsonNullableFilter<"AllianceScoring">
    card?: EnumCardTypeFilter<"AllianceScoring"> | $Enums.CardType
    notes?: StringNullableFilter<"AllianceScoring"> | string | null
    createdAt?: DateTimeFilter<"AllianceScoring"> | Date | string
    updatedAt?: DateTimeFilter<"AllianceScoring"> | Date | string
    alliance?: XOR<AllianceScalarRelationFilter, AllianceWhereInput>
    referee?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AllianceScoringOrderByWithRelationInput = {
    id?: SortOrder
    allianceId?: SortOrder
    refereeId?: SortOrderInput | SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    card?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    alliance?: AllianceOrderByWithRelationInput
    referee?: UserOrderByWithRelationInput
  }

  export type AllianceScoringWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    allianceId?: string
    AND?: AllianceScoringWhereInput | AllianceScoringWhereInput[]
    OR?: AllianceScoringWhereInput[]
    NOT?: AllianceScoringWhereInput | AllianceScoringWhereInput[]
    refereeId?: StringNullableFilter<"AllianceScoring"> | string | null
    scoreDetails?: JsonNullableFilter<"AllianceScoring">
    card?: EnumCardTypeFilter<"AllianceScoring"> | $Enums.CardType
    notes?: StringNullableFilter<"AllianceScoring"> | string | null
    createdAt?: DateTimeFilter<"AllianceScoring"> | Date | string
    updatedAt?: DateTimeFilter<"AllianceScoring"> | Date | string
    alliance?: XOR<AllianceScalarRelationFilter, AllianceWhereInput>
    referee?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "allianceId">

  export type AllianceScoringOrderByWithAggregationInput = {
    id?: SortOrder
    allianceId?: SortOrder
    refereeId?: SortOrderInput | SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    card?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AllianceScoringCountOrderByAggregateInput
    _max?: AllianceScoringMaxOrderByAggregateInput
    _min?: AllianceScoringMinOrderByAggregateInput
  }

  export type AllianceScoringScalarWhereWithAggregatesInput = {
    AND?: AllianceScoringScalarWhereWithAggregatesInput | AllianceScoringScalarWhereWithAggregatesInput[]
    OR?: AllianceScoringScalarWhereWithAggregatesInput[]
    NOT?: AllianceScoringScalarWhereWithAggregatesInput | AllianceScoringScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AllianceScoring"> | string
    allianceId?: StringWithAggregatesFilter<"AllianceScoring"> | string
    refereeId?: StringNullableWithAggregatesFilter<"AllianceScoring"> | string | null
    scoreDetails?: JsonNullableWithAggregatesFilter<"AllianceScoring">
    card?: EnumCardTypeWithAggregatesFilter<"AllianceScoring"> | $Enums.CardType
    notes?: StringNullableWithAggregatesFilter<"AllianceScoring"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AllianceScoring"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AllianceScoring"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: StringFilter<"Team"> | string
    teamNumber?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    organization?: StringNullableFilter<"Team"> | string | null
    avatar?: StringNullableFilter<"Team"> | string | null
    description?: StringNullableFilter<"Team"> | string | null
    teamMembers?: JsonNullableFilter<"Team">
    tournamentId?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    tournament?: XOR<TournamentNullableScalarRelationFilter, TournamentWhereInput> | null
    teamAlliances?: TeamAllianceListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    teamNumber?: SortOrder
    name?: SortOrder
    organization?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    teamMembers?: SortOrderInput | SortOrder
    tournamentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    teamAlliances?: TeamAllianceOrderByRelationAggregateInput
    teamStats?: TeamStatsOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamNumber?: string
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    name?: StringFilter<"Team"> | string
    organization?: StringNullableFilter<"Team"> | string | null
    avatar?: StringNullableFilter<"Team"> | string | null
    description?: StringNullableFilter<"Team"> | string | null
    teamMembers?: JsonNullableFilter<"Team">
    tournamentId?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
    tournament?: XOR<TournamentNullableScalarRelationFilter, TournamentWhereInput> | null
    teamAlliances?: TeamAllianceListRelationFilter
    teamStats?: TeamStatsListRelationFilter
  }, "id" | "teamNumber">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    teamNumber?: SortOrder
    name?: SortOrder
    organization?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    teamMembers?: SortOrderInput | SortOrder
    tournamentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Team"> | string
    teamNumber?: StringWithAggregatesFilter<"Team"> | string
    name?: StringWithAggregatesFilter<"Team"> | string
    organization?: StringNullableWithAggregatesFilter<"Team"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Team"> | string | null
    description?: StringNullableWithAggregatesFilter<"Team"> | string | null
    teamMembers?: JsonNullableWithAggregatesFilter<"Team">
    tournamentId?: StringNullableWithAggregatesFilter<"Team"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type TeamAllianceWhereInput = {
    AND?: TeamAllianceWhereInput | TeamAllianceWhereInput[]
    OR?: TeamAllianceWhereInput[]
    NOT?: TeamAllianceWhereInput | TeamAllianceWhereInput[]
    id?: StringFilter<"TeamAlliance"> | string
    teamId?: StringFilter<"TeamAlliance"> | string
    allianceId?: StringFilter<"TeamAlliance"> | string
    stationPosition?: IntFilter<"TeamAlliance"> | number
    isSurrogate?: BoolFilter<"TeamAlliance"> | boolean
    createdAt?: DateTimeFilter<"TeamAlliance"> | Date | string
    updatedAt?: DateTimeFilter<"TeamAlliance"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    alliance?: XOR<AllianceScalarRelationFilter, AllianceWhereInput>
  }

  export type TeamAllianceOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    allianceId?: SortOrder
    stationPosition?: SortOrder
    isSurrogate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    alliance?: AllianceOrderByWithRelationInput
  }

  export type TeamAllianceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_allianceId?: TeamAllianceTeamIdAllianceIdCompoundUniqueInput
    AND?: TeamAllianceWhereInput | TeamAllianceWhereInput[]
    OR?: TeamAllianceWhereInput[]
    NOT?: TeamAllianceWhereInput | TeamAllianceWhereInput[]
    teamId?: StringFilter<"TeamAlliance"> | string
    allianceId?: StringFilter<"TeamAlliance"> | string
    stationPosition?: IntFilter<"TeamAlliance"> | number
    isSurrogate?: BoolFilter<"TeamAlliance"> | boolean
    createdAt?: DateTimeFilter<"TeamAlliance"> | Date | string
    updatedAt?: DateTimeFilter<"TeamAlliance"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    alliance?: XOR<AllianceScalarRelationFilter, AllianceWhereInput>
  }, "id" | "teamId_allianceId">

  export type TeamAllianceOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    allianceId?: SortOrder
    stationPosition?: SortOrder
    isSurrogate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamAllianceCountOrderByAggregateInput
    _avg?: TeamAllianceAvgOrderByAggregateInput
    _max?: TeamAllianceMaxOrderByAggregateInput
    _min?: TeamAllianceMinOrderByAggregateInput
    _sum?: TeamAllianceSumOrderByAggregateInput
  }

  export type TeamAllianceScalarWhereWithAggregatesInput = {
    AND?: TeamAllianceScalarWhereWithAggregatesInput | TeamAllianceScalarWhereWithAggregatesInput[]
    OR?: TeamAllianceScalarWhereWithAggregatesInput[]
    NOT?: TeamAllianceScalarWhereWithAggregatesInput | TeamAllianceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamAlliance"> | string
    teamId?: StringWithAggregatesFilter<"TeamAlliance"> | string
    allianceId?: StringWithAggregatesFilter<"TeamAlliance"> | string
    stationPosition?: IntWithAggregatesFilter<"TeamAlliance"> | number
    isSurrogate?: BoolWithAggregatesFilter<"TeamAlliance"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TeamAlliance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamAlliance"> | Date | string
  }

  export type MatchScoresWhereInput = {
    AND?: MatchScoresWhereInput | MatchScoresWhereInput[]
    OR?: MatchScoresWhereInput[]
    NOT?: MatchScoresWhereInput | MatchScoresWhereInput[]
    id?: StringFilter<"MatchScores"> | string
    matchId?: StringFilter<"MatchScores"> | string
    redAutoScore?: IntFilter<"MatchScores"> | number
    redDriveScore?: IntFilter<"MatchScores"> | number
    redTotalScore?: IntFilter<"MatchScores"> | number
    blueAutoScore?: IntFilter<"MatchScores"> | number
    blueDriveScore?: IntFilter<"MatchScores"> | number
    blueTotalScore?: IntFilter<"MatchScores"> | number
    redGameElements?: JsonNullableFilter<"MatchScores">
    blueGameElements?: JsonNullableFilter<"MatchScores">
    redTeamCount?: IntFilter<"MatchScores"> | number
    redMultiplier?: FloatFilter<"MatchScores"> | number
    blueTeamCount?: IntFilter<"MatchScores"> | number
    blueMultiplier?: FloatFilter<"MatchScores"> | number
    scoreDetails?: JsonNullableFilter<"MatchScores">
    createdAt?: DateTimeFilter<"MatchScores"> | Date | string
    updatedAt?: DateTimeFilter<"MatchScores"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }

  export type MatchScoresOrderByWithRelationInput = {
    id?: SortOrder
    matchId?: SortOrder
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redGameElements?: SortOrderInput | SortOrder
    blueGameElements?: SortOrderInput | SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    match?: MatchOrderByWithRelationInput
  }

  export type MatchScoresWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    matchId?: string
    AND?: MatchScoresWhereInput | MatchScoresWhereInput[]
    OR?: MatchScoresWhereInput[]
    NOT?: MatchScoresWhereInput | MatchScoresWhereInput[]
    redAutoScore?: IntFilter<"MatchScores"> | number
    redDriveScore?: IntFilter<"MatchScores"> | number
    redTotalScore?: IntFilter<"MatchScores"> | number
    blueAutoScore?: IntFilter<"MatchScores"> | number
    blueDriveScore?: IntFilter<"MatchScores"> | number
    blueTotalScore?: IntFilter<"MatchScores"> | number
    redGameElements?: JsonNullableFilter<"MatchScores">
    blueGameElements?: JsonNullableFilter<"MatchScores">
    redTeamCount?: IntFilter<"MatchScores"> | number
    redMultiplier?: FloatFilter<"MatchScores"> | number
    blueTeamCount?: IntFilter<"MatchScores"> | number
    blueMultiplier?: FloatFilter<"MatchScores"> | number
    scoreDetails?: JsonNullableFilter<"MatchScores">
    createdAt?: DateTimeFilter<"MatchScores"> | Date | string
    updatedAt?: DateTimeFilter<"MatchScores"> | Date | string
    match?: XOR<MatchScalarRelationFilter, MatchWhereInput>
  }, "id" | "matchId">

  export type MatchScoresOrderByWithAggregationInput = {
    id?: SortOrder
    matchId?: SortOrder
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redGameElements?: SortOrderInput | SortOrder
    blueGameElements?: SortOrderInput | SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
    scoreDetails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MatchScoresCountOrderByAggregateInput
    _avg?: MatchScoresAvgOrderByAggregateInput
    _max?: MatchScoresMaxOrderByAggregateInput
    _min?: MatchScoresMinOrderByAggregateInput
    _sum?: MatchScoresSumOrderByAggregateInput
  }

  export type MatchScoresScalarWhereWithAggregatesInput = {
    AND?: MatchScoresScalarWhereWithAggregatesInput | MatchScoresScalarWhereWithAggregatesInput[]
    OR?: MatchScoresScalarWhereWithAggregatesInput[]
    NOT?: MatchScoresScalarWhereWithAggregatesInput | MatchScoresScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MatchScores"> | string
    matchId?: StringWithAggregatesFilter<"MatchScores"> | string
    redAutoScore?: IntWithAggregatesFilter<"MatchScores"> | number
    redDriveScore?: IntWithAggregatesFilter<"MatchScores"> | number
    redTotalScore?: IntWithAggregatesFilter<"MatchScores"> | number
    blueAutoScore?: IntWithAggregatesFilter<"MatchScores"> | number
    blueDriveScore?: IntWithAggregatesFilter<"MatchScores"> | number
    blueTotalScore?: IntWithAggregatesFilter<"MatchScores"> | number
    redGameElements?: JsonNullableWithAggregatesFilter<"MatchScores">
    blueGameElements?: JsonNullableWithAggregatesFilter<"MatchScores">
    redTeamCount?: IntWithAggregatesFilter<"MatchScores"> | number
    redMultiplier?: FloatWithAggregatesFilter<"MatchScores"> | number
    blueTeamCount?: IntWithAggregatesFilter<"MatchScores"> | number
    blueMultiplier?: FloatWithAggregatesFilter<"MatchScores"> | number
    scoreDetails?: JsonNullableWithAggregatesFilter<"MatchScores">
    createdAt?: DateTimeWithAggregatesFilter<"MatchScores"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MatchScores"> | Date | string
  }

  export type TeamStatsWhereInput = {
    AND?: TeamStatsWhereInput | TeamStatsWhereInput[]
    OR?: TeamStatsWhereInput[]
    NOT?: TeamStatsWhereInput | TeamStatsWhereInput[]
    id?: StringFilter<"TeamStats"> | string
    teamId?: StringFilter<"TeamStats"> | string
    tournamentId?: StringFilter<"TeamStats"> | string
    stageId?: StringNullableFilter<"TeamStats"> | string | null
    wins?: IntFilter<"TeamStats"> | number
    losses?: IntFilter<"TeamStats"> | number
    ties?: IntFilter<"TeamStats"> | number
    matchesPlayed?: IntFilter<"TeamStats"> | number
    rank?: IntNullableFilter<"TeamStats"> | number | null
    tiebreaker1?: FloatFilter<"TeamStats"> | number
    tiebreaker2?: FloatFilter<"TeamStats"> | number
    createdAt?: DateTimeFilter<"TeamStats"> | Date | string
    updatedAt?: DateTimeFilter<"TeamStats"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    stage?: XOR<StageNullableScalarRelationFilter, StageWhereInput> | null
  }

  export type TeamStatsOrderByWithRelationInput = {
    id?: SortOrder
    teamId?: SortOrder
    tournamentId?: SortOrder
    stageId?: SortOrderInput | SortOrder
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrderInput | SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    team?: TeamOrderByWithRelationInput
    tournament?: TournamentOrderByWithRelationInput
    stage?: StageOrderByWithRelationInput
  }

  export type TeamStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    teamId_tournamentId?: TeamStatsTeamIdTournamentIdCompoundUniqueInput
    AND?: TeamStatsWhereInput | TeamStatsWhereInput[]
    OR?: TeamStatsWhereInput[]
    NOT?: TeamStatsWhereInput | TeamStatsWhereInput[]
    teamId?: StringFilter<"TeamStats"> | string
    tournamentId?: StringFilter<"TeamStats"> | string
    stageId?: StringNullableFilter<"TeamStats"> | string | null
    wins?: IntFilter<"TeamStats"> | number
    losses?: IntFilter<"TeamStats"> | number
    ties?: IntFilter<"TeamStats"> | number
    matchesPlayed?: IntFilter<"TeamStats"> | number
    rank?: IntNullableFilter<"TeamStats"> | number | null
    tiebreaker1?: FloatFilter<"TeamStats"> | number
    tiebreaker2?: FloatFilter<"TeamStats"> | number
    createdAt?: DateTimeFilter<"TeamStats"> | Date | string
    updatedAt?: DateTimeFilter<"TeamStats"> | Date | string
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    stage?: XOR<StageNullableScalarRelationFilter, StageWhereInput> | null
  }, "id" | "teamId_tournamentId">

  export type TeamStatsOrderByWithAggregationInput = {
    id?: SortOrder
    teamId?: SortOrder
    tournamentId?: SortOrder
    stageId?: SortOrderInput | SortOrder
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrderInput | SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeamStatsCountOrderByAggregateInput
    _avg?: TeamStatsAvgOrderByAggregateInput
    _max?: TeamStatsMaxOrderByAggregateInput
    _min?: TeamStatsMinOrderByAggregateInput
    _sum?: TeamStatsSumOrderByAggregateInput
  }

  export type TeamStatsScalarWhereWithAggregatesInput = {
    AND?: TeamStatsScalarWhereWithAggregatesInput | TeamStatsScalarWhereWithAggregatesInput[]
    OR?: TeamStatsScalarWhereWithAggregatesInput[]
    NOT?: TeamStatsScalarWhereWithAggregatesInput | TeamStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TeamStats"> | string
    teamId?: StringWithAggregatesFilter<"TeamStats"> | string
    tournamentId?: StringWithAggregatesFilter<"TeamStats"> | string
    stageId?: StringNullableWithAggregatesFilter<"TeamStats"> | string | null
    wins?: IntWithAggregatesFilter<"TeamStats"> | number
    losses?: IntWithAggregatesFilter<"TeamStats"> | number
    ties?: IntWithAggregatesFilter<"TeamStats"> | number
    matchesPlayed?: IntWithAggregatesFilter<"TeamStats"> | number
    rank?: IntNullableWithAggregatesFilter<"TeamStats"> | number | null
    tiebreaker1?: FloatWithAggregatesFilter<"TeamStats"> | number
    tiebreaker2?: FloatWithAggregatesFilter<"TeamStats"> | number
    createdAt?: DateTimeWithAggregatesFilter<"TeamStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TeamStats"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TournamentCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutTournamentsInput
    stages?: StageCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId: string
    stages?: StageUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutTournamentsNestedInput
    stages?: StageUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: StringFieldUpdateOperationsInput | string
    stages?: StageUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId: string
  }

  export type TournamentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: StringFieldUpdateOperationsInput | string
  }

  export type StageCreateInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutStagesInput
    matches?: MatchCreateNestedManyWithoutStageInput
    teamStats?: TeamStatsCreateNestedManyWithoutStageInput
  }

  export type StageUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    tournamentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: MatchUncheckedCreateNestedManyWithoutStageInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutStageInput
  }

  export type StageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutStagesNestedInput
    matches?: MatchUpdateManyWithoutStageNestedInput
    teamStats?: TeamStatsUpdateManyWithoutStageNestedInput
  }

  export type StageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: MatchUncheckedUpdateManyWithoutStageNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutStageNestedInput
  }

  export type StageCreateManyInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    tournamentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stage: StageCreateNestedOneWithoutMatchesInput
    alliances?: AllianceCreateNestedManyWithoutMatchInput
    scoredBy?: UserCreateNestedOneWithoutScoredMatchesInput
    referees?: MatchRefereeCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceUncheckedCreateNestedManyWithoutMatchInput
    referees?: MatchRefereeUncheckedCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: StageUpdateOneRequiredWithoutMatchesNestedInput
    alliances?: AllianceUpdateManyWithoutMatchNestedInput
    scoredBy?: UserUpdateOneWithoutScoredMatchesNestedInput
    referees?: MatchRefereeUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUncheckedUpdateManyWithoutMatchNestedInput
    referees?: MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchCreateManyInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeCreateInput = {
    id?: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutRefereesInput
    user: UserCreateNestedOneWithoutMatchRefereesInput
  }

  export type MatchRefereeUncheckedCreateInput = {
    id?: string
    matchId: string
    userId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutRefereesNestedInput
    user?: UserUpdateOneRequiredWithoutMatchRefereesNestedInput
  }

  export type MatchRefereeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeCreateManyInput = {
    id?: string
    matchId: string
    userId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceCreateInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutAlliancesInput
    teamAlliances?: TeamAllianceCreateNestedManyWithoutAllianceInput
    allianceScoring?: AllianceScoringCreateNestedOneWithoutAllianceInput
  }

  export type AllianceUncheckedCreateInput = {
    id?: string
    color: string
    score?: number
    matchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutAllianceInput
    allianceScoring?: AllianceScoringUncheckedCreateNestedOneWithoutAllianceInput
  }

  export type AllianceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutAlliancesNestedInput
    teamAlliances?: TeamAllianceUpdateManyWithoutAllianceNestedInput
    allianceScoring?: AllianceScoringUpdateOneWithoutAllianceNestedInput
  }

  export type AllianceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutAllianceNestedInput
    allianceScoring?: AllianceScoringUncheckedUpdateOneWithoutAllianceNestedInput
  }

  export type AllianceCreateManyInput = {
    id?: string
    color: string
    score?: number
    matchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceScoringCreateInput = {
    id?: string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliance: AllianceCreateNestedOneWithoutAllianceScoringInput
    referee?: UserCreateNestedOneWithoutAllianceRefForInput
  }

  export type AllianceScoringUncheckedCreateInput = {
    id?: string
    allianceId: string
    refereeId?: string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceScoringUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliance?: AllianceUpdateOneRequiredWithoutAllianceScoringNestedInput
    referee?: UserUpdateOneWithoutAllianceRefForNestedInput
  }

  export type AllianceScoringUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    refereeId?: NullableStringFieldUpdateOperationsInput | string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceScoringCreateManyInput = {
    id?: string
    allianceId: string
    refereeId?: string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceScoringUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceScoringUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    refereeId?: NullableStringFieldUpdateOperationsInput | string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament?: TournamentCreateNestedOneWithoutTeamsInput
    teamAlliances?: TeamAllianceCreateNestedManyWithoutTeamInput
    teamStats?: TeamStatsCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutTeamInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneWithoutTeamsNestedInput
    teamAlliances?: TeamAllianceUpdateManyWithoutTeamNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutTeamNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamCreateManyInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceCreateInput = {
    id?: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutTeamAlliancesInput
    alliance: AllianceCreateNestedOneWithoutTeamAlliancesInput
  }

  export type TeamAllianceUncheckedCreateInput = {
    id?: string
    teamId: string
    allianceId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutTeamAlliancesNestedInput
    alliance?: AllianceUpdateOneRequiredWithoutTeamAlliancesNestedInput
  }

  export type TeamAllianceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceCreateManyInput = {
    id?: string
    teamId: string
    allianceId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchScoresCreateInput = {
    id?: string
    redAutoScore?: number
    redDriveScore?: number
    redTotalScore?: number
    blueAutoScore?: number
    blueDriveScore?: number
    blueTotalScore?: number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: number
    redMultiplier?: number
    blueTeamCount?: number
    blueMultiplier?: number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutMatchScoresInput
  }

  export type MatchScoresUncheckedCreateInput = {
    id?: string
    matchId: string
    redAutoScore?: number
    redDriveScore?: number
    redTotalScore?: number
    blueAutoScore?: number
    blueDriveScore?: number
    blueTotalScore?: number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: number
    redMultiplier?: number
    blueTeamCount?: number
    blueMultiplier?: number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchScoresUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutMatchScoresNestedInput
  }

  export type MatchScoresUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchScoresCreateManyInput = {
    id?: string
    matchId: string
    redAutoScore?: number
    redDriveScore?: number
    redTotalScore?: number
    blueAutoScore?: number
    blueDriveScore?: number
    blueTotalScore?: number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: number
    redMultiplier?: number
    blueTeamCount?: number
    blueMultiplier?: number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchScoresUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchScoresUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsCreateInput = {
    id?: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutTeamStatsInput
    tournament: TournamentCreateNestedOneWithoutTeamStatsInput
    stage?: StageCreateNestedOneWithoutTeamStatsInput
  }

  export type TeamStatsUncheckedCreateInput = {
    id?: string
    teamId: string
    tournamentId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutTeamStatsNestedInput
    tournament?: TournamentUpdateOneRequiredWithoutTeamStatsNestedInput
    stage?: StageUpdateOneWithoutTeamStatsNestedInput
  }

  export type TeamStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsCreateManyInput = {
    id?: string
    teamId: string
    tournamentId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type TournamentListRelationFilter = {
    every?: TournamentWhereInput
    some?: TournamentWhereInput
    none?: TournamentWhereInput
  }

  export type MatchListRelationFilter = {
    every?: MatchWhereInput
    some?: MatchWhereInput
    none?: MatchWhereInput
  }

  export type AllianceScoringListRelationFilter = {
    every?: AllianceScoringWhereInput
    some?: AllianceScoringWhereInput
    none?: AllianceScoringWhereInput
  }

  export type MatchRefereeListRelationFilter = {
    every?: MatchRefereeWhereInput
    some?: MatchRefereeWhereInput
    none?: MatchRefereeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AllianceScoringOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchRefereeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    DateOfBirth?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    DateOfBirth?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    gender?: SortOrder
    DateOfBirth?: SortOrder
    phoneNumber?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StageListRelationFilter = {
    every?: StageWhereInput
    some?: StageWhereInput
    none?: StageWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type TeamStatsListRelationFilter = {
    every?: TeamStatsWhereInput
    some?: TeamStatsWhereInput
    none?: TeamStatsWhereInput
  }

  export type StageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type TournamentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type TournamentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    adminId?: SortOrder
  }

  export type EnumStageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StageType | EnumStageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStageTypeFilter<$PrismaModel> | $Enums.StageType
  }

  export type TournamentScalarRelationFilter = {
    is?: TournamentWhereInput
    isNot?: TournamentWhereInput
  }

  export type StageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StageType | EnumStageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStageTypeWithAggregatesFilter<$PrismaModel> | $Enums.StageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStageTypeFilter<$PrismaModel>
    _max?: NestedEnumStageTypeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StageScalarRelationFilter = {
    is?: StageWhereInput
    isNot?: StageWhereInput
  }

  export type AllianceListRelationFilter = {
    every?: AllianceWhereInput
    some?: AllianceWhereInput
    none?: AllianceWhereInput
  }

  export type MatchScoresNullableScalarRelationFilter = {
    is?: MatchScoresWhereInput | null
    isNot?: MatchScoresWhereInput | null
  }

  export type AllianceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    matchNumber?: SortOrder
    roundNumber?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    scheduledTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    winningAlliance?: SortOrder
    stageId?: SortOrder
    scoredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    matchNumber?: SortOrder
    roundNumber?: SortOrder
    duration?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    matchNumber?: SortOrder
    roundNumber?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    scheduledTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    winningAlliance?: SortOrder
    stageId?: SortOrder
    scoredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    matchNumber?: SortOrder
    roundNumber?: SortOrder
    status?: SortOrder
    startTime?: SortOrder
    scheduledTime?: SortOrder
    endTime?: SortOrder
    duration?: SortOrder
    winningAlliance?: SortOrder
    stageId?: SortOrder
    scoredById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    matchNumber?: SortOrder
    roundNumber?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumRefereeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RefereeRole | EnumRefereeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRefereeRoleFilter<$PrismaModel> | $Enums.RefereeRole
  }

  export type MatchScalarRelationFilter = {
    is?: MatchWhereInput
    isNot?: MatchWhereInput
  }

  export type MatchRefereeMatchIdUserIdCompoundUniqueInput = {
    matchId: string
    userId: string
  }

  export type MatchRefereeCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchRefereeMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchRefereeMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    position?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRefereeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefereeRole | EnumRefereeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRefereeRoleWithAggregatesFilter<$PrismaModel> | $Enums.RefereeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefereeRoleFilter<$PrismaModel>
    _max?: NestedEnumRefereeRoleFilter<$PrismaModel>
  }

  export type TeamAllianceListRelationFilter = {
    every?: TeamAllianceWhereInput
    some?: TeamAllianceWhereInput
    none?: TeamAllianceWhereInput
  }

  export type AllianceScoringNullableScalarRelationFilter = {
    is?: AllianceScoringWhereInput | null
    isNot?: AllianceScoringWhereInput | null
  }

  export type TeamAllianceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AllianceCountOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    score?: SortOrder
    matchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllianceAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type AllianceMaxOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    score?: SortOrder
    matchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllianceMinOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    score?: SortOrder
    matchId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllianceSumOrderByAggregateInput = {
    score?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumCardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCardTypeFilter<$PrismaModel> | $Enums.CardType
  }

  export type AllianceScalarRelationFilter = {
    is?: AllianceWhereInput
    isNot?: AllianceWhereInput
  }

  export type AllianceScoringCountOrderByAggregateInput = {
    id?: SortOrder
    allianceId?: SortOrder
    refereeId?: SortOrder
    scoreDetails?: SortOrder
    card?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllianceScoringMaxOrderByAggregateInput = {
    id?: SortOrder
    allianceId?: SortOrder
    refereeId?: SortOrder
    card?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AllianceScoringMinOrderByAggregateInput = {
    id?: SortOrder
    allianceId?: SortOrder
    refereeId?: SortOrder
    card?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumCardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCardTypeWithAggregatesFilter<$PrismaModel> | $Enums.CardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardTypeFilter<$PrismaModel>
    _max?: NestedEnumCardTypeFilter<$PrismaModel>
  }

  export type TournamentNullableScalarRelationFilter = {
    is?: TournamentWhereInput | null
    isNot?: TournamentWhereInput | null
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    teamNumber?: SortOrder
    name?: SortOrder
    organization?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    teamMembers?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    teamNumber?: SortOrder
    name?: SortOrder
    organization?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    teamNumber?: SortOrder
    name?: SortOrder
    organization?: SortOrder
    avatar?: SortOrder
    description?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamAllianceTeamIdAllianceIdCompoundUniqueInput = {
    teamId: string
    allianceId: string
  }

  export type TeamAllianceCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    allianceId?: SortOrder
    stationPosition?: SortOrder
    isSurrogate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamAllianceAvgOrderByAggregateInput = {
    stationPosition?: SortOrder
  }

  export type TeamAllianceMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    allianceId?: SortOrder
    stationPosition?: SortOrder
    isSurrogate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamAllianceMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    allianceId?: SortOrder
    stationPosition?: SortOrder
    isSurrogate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamAllianceSumOrderByAggregateInput = {
    stationPosition?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type MatchScoresCountOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redGameElements?: SortOrder
    blueGameElements?: SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
    scoreDetails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchScoresAvgOrderByAggregateInput = {
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
  }

  export type MatchScoresMaxOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchScoresMinOrderByAggregateInput = {
    id?: SortOrder
    matchId?: SortOrder
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MatchScoresSumOrderByAggregateInput = {
    redAutoScore?: SortOrder
    redDriveScore?: SortOrder
    redTotalScore?: SortOrder
    blueAutoScore?: SortOrder
    blueDriveScore?: SortOrder
    blueTotalScore?: SortOrder
    redTeamCount?: SortOrder
    redMultiplier?: SortOrder
    blueTeamCount?: SortOrder
    blueMultiplier?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StageNullableScalarRelationFilter = {
    is?: StageWhereInput | null
    isNot?: StageWhereInput | null
  }

  export type TeamStatsTeamIdTournamentIdCompoundUniqueInput = {
    teamId: string
    tournamentId: string
  }

  export type TeamStatsCountOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    tournamentId?: SortOrder
    stageId?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamStatsAvgOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
  }

  export type TeamStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    tournamentId?: SortOrder
    stageId?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamStatsMinOrderByAggregateInput = {
    id?: SortOrder
    teamId?: SortOrder
    tournamentId?: SortOrder
    stageId?: SortOrder
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeamStatsSumOrderByAggregateInput = {
    wins?: SortOrder
    losses?: SortOrder
    ties?: SortOrder
    matchesPlayed?: SortOrder
    rank?: SortOrder
    tiebreaker1?: SortOrder
    tiebreaker2?: SortOrder
  }

  export type UserCreateNestedOneWithoutCreatedUsersInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TournamentCreateNestedManyWithoutAdminInput = {
    create?: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput> | TournamentCreateWithoutAdminInput[] | TournamentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutAdminInput | TournamentCreateOrConnectWithoutAdminInput[]
    createMany?: TournamentCreateManyAdminInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutScoredByInput = {
    create?: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput> | MatchCreateWithoutScoredByInput[] | MatchUncheckedCreateWithoutScoredByInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutScoredByInput | MatchCreateOrConnectWithoutScoredByInput[]
    createMany?: MatchCreateManyScoredByInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type AllianceScoringCreateNestedManyWithoutRefereeInput = {
    create?: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput> | AllianceScoringCreateWithoutRefereeInput[] | AllianceScoringUncheckedCreateWithoutRefereeInput[]
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutRefereeInput | AllianceScoringCreateOrConnectWithoutRefereeInput[]
    createMany?: AllianceScoringCreateManyRefereeInputEnvelope
    connect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
  }

  export type MatchRefereeCreateNestedManyWithoutUserInput = {
    create?: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput> | MatchRefereeCreateWithoutUserInput[] | MatchRefereeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutUserInput | MatchRefereeCreateOrConnectWithoutUserInput[]
    createMany?: MatchRefereeCreateManyUserInputEnvelope
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type TournamentUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput> | TournamentCreateWithoutAdminInput[] | TournamentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutAdminInput | TournamentCreateOrConnectWithoutAdminInput[]
    createMany?: TournamentCreateManyAdminInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutScoredByInput = {
    create?: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput> | MatchCreateWithoutScoredByInput[] | MatchUncheckedCreateWithoutScoredByInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutScoredByInput | MatchCreateOrConnectWithoutScoredByInput[]
    createMany?: MatchCreateManyScoredByInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput = {
    create?: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput> | AllianceScoringCreateWithoutRefereeInput[] | AllianceScoringUncheckedCreateWithoutRefereeInput[]
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutRefereeInput | AllianceScoringCreateOrConnectWithoutRefereeInput[]
    createMany?: AllianceScoringCreateManyRefereeInputEnvelope
    connect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
  }

  export type MatchRefereeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput> | MatchRefereeCreateWithoutUserInput[] | MatchRefereeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutUserInput | MatchRefereeCreateOrConnectWithoutUserInput[]
    createMany?: MatchRefereeCreateManyUserInputEnvelope
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutCreatedUsersNestedInput = {
    create?: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedUsersInput
    upsert?: UserUpsertWithoutCreatedUsersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedUsersInput, UserUpdateWithoutCreatedUsersInput>, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatedByInput | UserUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatedByInput | UserUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatedByInput | UserUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TournamentUpdateManyWithoutAdminNestedInput = {
    create?: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput> | TournamentCreateWithoutAdminInput[] | TournamentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutAdminInput | TournamentCreateOrConnectWithoutAdminInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutAdminInput | TournamentUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: TournamentCreateManyAdminInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutAdminInput | TournamentUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutAdminInput | TournamentUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutScoredByNestedInput = {
    create?: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput> | MatchCreateWithoutScoredByInput[] | MatchUncheckedCreateWithoutScoredByInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutScoredByInput | MatchCreateOrConnectWithoutScoredByInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutScoredByInput | MatchUpsertWithWhereUniqueWithoutScoredByInput[]
    createMany?: MatchCreateManyScoredByInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutScoredByInput | MatchUpdateWithWhereUniqueWithoutScoredByInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutScoredByInput | MatchUpdateManyWithWhereWithoutScoredByInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type AllianceScoringUpdateManyWithoutRefereeNestedInput = {
    create?: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput> | AllianceScoringCreateWithoutRefereeInput[] | AllianceScoringUncheckedCreateWithoutRefereeInput[]
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutRefereeInput | AllianceScoringCreateOrConnectWithoutRefereeInput[]
    upsert?: AllianceScoringUpsertWithWhereUniqueWithoutRefereeInput | AllianceScoringUpsertWithWhereUniqueWithoutRefereeInput[]
    createMany?: AllianceScoringCreateManyRefereeInputEnvelope
    set?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    disconnect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    delete?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    connect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    update?: AllianceScoringUpdateWithWhereUniqueWithoutRefereeInput | AllianceScoringUpdateWithWhereUniqueWithoutRefereeInput[]
    updateMany?: AllianceScoringUpdateManyWithWhereWithoutRefereeInput | AllianceScoringUpdateManyWithWhereWithoutRefereeInput[]
    deleteMany?: AllianceScoringScalarWhereInput | AllianceScoringScalarWhereInput[]
  }

  export type MatchRefereeUpdateManyWithoutUserNestedInput = {
    create?: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput> | MatchRefereeCreateWithoutUserInput[] | MatchRefereeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutUserInput | MatchRefereeCreateOrConnectWithoutUserInput[]
    upsert?: MatchRefereeUpsertWithWhereUniqueWithoutUserInput | MatchRefereeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MatchRefereeCreateManyUserInputEnvelope
    set?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    disconnect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    delete?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    update?: MatchRefereeUpdateWithWhereUniqueWithoutUserInput | MatchRefereeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MatchRefereeUpdateManyWithWhereWithoutUserInput | MatchRefereeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput> | UserCreateWithoutCreatedByInput[] | UserUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCreatedByInput | UserCreateOrConnectWithoutCreatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCreatedByInput | UserUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: UserCreateManyCreatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCreatedByInput | UserUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCreatedByInput | UserUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type TournamentUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput> | TournamentCreateWithoutAdminInput[] | TournamentUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutAdminInput | TournamentCreateOrConnectWithoutAdminInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutAdminInput | TournamentUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: TournamentCreateManyAdminInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutAdminInput | TournamentUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutAdminInput | TournamentUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutScoredByNestedInput = {
    create?: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput> | MatchCreateWithoutScoredByInput[] | MatchUncheckedCreateWithoutScoredByInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutScoredByInput | MatchCreateOrConnectWithoutScoredByInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutScoredByInput | MatchUpsertWithWhereUniqueWithoutScoredByInput[]
    createMany?: MatchCreateManyScoredByInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutScoredByInput | MatchUpdateWithWhereUniqueWithoutScoredByInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutScoredByInput | MatchUpdateManyWithWhereWithoutScoredByInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput = {
    create?: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput> | AllianceScoringCreateWithoutRefereeInput[] | AllianceScoringUncheckedCreateWithoutRefereeInput[]
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutRefereeInput | AllianceScoringCreateOrConnectWithoutRefereeInput[]
    upsert?: AllianceScoringUpsertWithWhereUniqueWithoutRefereeInput | AllianceScoringUpsertWithWhereUniqueWithoutRefereeInput[]
    createMany?: AllianceScoringCreateManyRefereeInputEnvelope
    set?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    disconnect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    delete?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    connect?: AllianceScoringWhereUniqueInput | AllianceScoringWhereUniqueInput[]
    update?: AllianceScoringUpdateWithWhereUniqueWithoutRefereeInput | AllianceScoringUpdateWithWhereUniqueWithoutRefereeInput[]
    updateMany?: AllianceScoringUpdateManyWithWhereWithoutRefereeInput | AllianceScoringUpdateManyWithWhereWithoutRefereeInput[]
    deleteMany?: AllianceScoringScalarWhereInput | AllianceScoringScalarWhereInput[]
  }

  export type MatchRefereeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput> | MatchRefereeCreateWithoutUserInput[] | MatchRefereeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutUserInput | MatchRefereeCreateOrConnectWithoutUserInput[]
    upsert?: MatchRefereeUpsertWithWhereUniqueWithoutUserInput | MatchRefereeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MatchRefereeCreateManyUserInputEnvelope
    set?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    disconnect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    delete?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    update?: MatchRefereeUpdateWithWhereUniqueWithoutUserInput | MatchRefereeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MatchRefereeUpdateManyWithWhereWithoutUserInput | MatchRefereeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTournamentsInput = {
    create?: XOR<UserCreateWithoutTournamentsInput, UserUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentsInput
    connect?: UserWhereUniqueInput
  }

  export type StageCreateNestedManyWithoutTournamentInput = {
    create?: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput> | StageCreateWithoutTournamentInput[] | StageUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: StageCreateOrConnectWithoutTournamentInput | StageCreateOrConnectWithoutTournamentInput[]
    createMany?: StageCreateManyTournamentInputEnvelope
    connect?: StageWhereUniqueInput | StageWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamStatsCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput> | TeamStatsCreateWithoutTournamentInput[] | TeamStatsUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTournamentInput | TeamStatsCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamStatsCreateManyTournamentInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type StageUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput> | StageCreateWithoutTournamentInput[] | StageUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: StageCreateOrConnectWithoutTournamentInput | StageCreateOrConnectWithoutTournamentInput[]
    createMany?: StageCreateManyTournamentInputEnvelope
    connect?: StageWhereUniqueInput | StageWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type TeamStatsUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput> | TeamStatsCreateWithoutTournamentInput[] | TeamStatsUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTournamentInput | TeamStatsCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamStatsCreateManyTournamentInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTournamentsNestedInput = {
    create?: XOR<UserCreateWithoutTournamentsInput, UserUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTournamentsInput
    upsert?: UserUpsertWithoutTournamentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTournamentsInput, UserUpdateWithoutTournamentsInput>, UserUncheckedUpdateWithoutTournamentsInput>
  }

  export type StageUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput> | StageCreateWithoutTournamentInput[] | StageUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: StageCreateOrConnectWithoutTournamentInput | StageCreateOrConnectWithoutTournamentInput[]
    upsert?: StageUpsertWithWhereUniqueWithoutTournamentInput | StageUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: StageCreateManyTournamentInputEnvelope
    set?: StageWhereUniqueInput | StageWhereUniqueInput[]
    disconnect?: StageWhereUniqueInput | StageWhereUniqueInput[]
    delete?: StageWhereUniqueInput | StageWhereUniqueInput[]
    connect?: StageWhereUniqueInput | StageWhereUniqueInput[]
    update?: StageUpdateWithWhereUniqueWithoutTournamentInput | StageUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: StageUpdateManyWithWhereWithoutTournamentInput | StageUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: StageScalarWhereInput | StageScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutTournamentInput | TeamUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutTournamentInput | TeamUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutTournamentInput | TeamUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamStatsUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput> | TeamStatsCreateWithoutTournamentInput[] | TeamStatsUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTournamentInput | TeamStatsCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutTournamentInput | TeamStatsUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamStatsCreateManyTournamentInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutTournamentInput | TeamStatsUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutTournamentInput | TeamStatsUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type StageUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput> | StageCreateWithoutTournamentInput[] | StageUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: StageCreateOrConnectWithoutTournamentInput | StageCreateOrConnectWithoutTournamentInput[]
    upsert?: StageUpsertWithWhereUniqueWithoutTournamentInput | StageUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: StageCreateManyTournamentInputEnvelope
    set?: StageWhereUniqueInput | StageWhereUniqueInput[]
    disconnect?: StageWhereUniqueInput | StageWhereUniqueInput[]
    delete?: StageWhereUniqueInput | StageWhereUniqueInput[]
    connect?: StageWhereUniqueInput | StageWhereUniqueInput[]
    update?: StageUpdateWithWhereUniqueWithoutTournamentInput | StageUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: StageUpdateManyWithWhereWithoutTournamentInput | StageUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: StageScalarWhereInput | StageScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutTournamentInput | TeamUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutTournamentInput | TeamUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutTournamentInput | TeamUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type TeamStatsUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput> | TeamStatsCreateWithoutTournamentInput[] | TeamStatsUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTournamentInput | TeamStatsCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutTournamentInput | TeamStatsUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamStatsCreateManyTournamentInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutTournamentInput | TeamStatsUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutTournamentInput | TeamStatsUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type TournamentCreateNestedOneWithoutStagesInput = {
    create?: XOR<TournamentCreateWithoutStagesInput, TournamentUncheckedCreateWithoutStagesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutStagesInput
    connect?: TournamentWhereUniqueInput
  }

  export type MatchCreateNestedManyWithoutStageInput = {
    create?: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput> | MatchCreateWithoutStageInput[] | MatchUncheckedCreateWithoutStageInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutStageInput | MatchCreateOrConnectWithoutStageInput[]
    createMany?: MatchCreateManyStageInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TeamStatsCreateNestedManyWithoutStageInput = {
    create?: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput> | TeamStatsCreateWithoutStageInput[] | TeamStatsUncheckedCreateWithoutStageInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutStageInput | TeamStatsCreateOrConnectWithoutStageInput[]
    createMany?: TeamStatsCreateManyStageInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutStageInput = {
    create?: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput> | MatchCreateWithoutStageInput[] | MatchUncheckedCreateWithoutStageInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutStageInput | MatchCreateOrConnectWithoutStageInput[]
    createMany?: MatchCreateManyStageInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TeamStatsUncheckedCreateNestedManyWithoutStageInput = {
    create?: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput> | TeamStatsCreateWithoutStageInput[] | TeamStatsUncheckedCreateWithoutStageInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutStageInput | TeamStatsCreateOrConnectWithoutStageInput[]
    createMany?: TeamStatsCreateManyStageInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type EnumStageTypeFieldUpdateOperationsInput = {
    set?: $Enums.StageType
  }

  export type TournamentUpdateOneRequiredWithoutStagesNestedInput = {
    create?: XOR<TournamentCreateWithoutStagesInput, TournamentUncheckedCreateWithoutStagesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutStagesInput
    upsert?: TournamentUpsertWithoutStagesInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutStagesInput, TournamentUpdateWithoutStagesInput>, TournamentUncheckedUpdateWithoutStagesInput>
  }

  export type MatchUpdateManyWithoutStageNestedInput = {
    create?: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput> | MatchCreateWithoutStageInput[] | MatchUncheckedCreateWithoutStageInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutStageInput | MatchCreateOrConnectWithoutStageInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutStageInput | MatchUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: MatchCreateManyStageInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutStageInput | MatchUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutStageInput | MatchUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TeamStatsUpdateManyWithoutStageNestedInput = {
    create?: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput> | TeamStatsCreateWithoutStageInput[] | TeamStatsUncheckedCreateWithoutStageInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutStageInput | TeamStatsCreateOrConnectWithoutStageInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutStageInput | TeamStatsUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: TeamStatsCreateManyStageInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutStageInput | TeamStatsUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutStageInput | TeamStatsUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutStageNestedInput = {
    create?: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput> | MatchCreateWithoutStageInput[] | MatchUncheckedCreateWithoutStageInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutStageInput | MatchCreateOrConnectWithoutStageInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutStageInput | MatchUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: MatchCreateManyStageInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutStageInput | MatchUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutStageInput | MatchUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TeamStatsUncheckedUpdateManyWithoutStageNestedInput = {
    create?: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput> | TeamStatsCreateWithoutStageInput[] | TeamStatsUncheckedCreateWithoutStageInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutStageInput | TeamStatsCreateOrConnectWithoutStageInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutStageInput | TeamStatsUpsertWithWhereUniqueWithoutStageInput[]
    createMany?: TeamStatsCreateManyStageInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutStageInput | TeamStatsUpdateWithWhereUniqueWithoutStageInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutStageInput | TeamStatsUpdateManyWithWhereWithoutStageInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type StageCreateNestedOneWithoutMatchesInput = {
    create?: XOR<StageCreateWithoutMatchesInput, StageUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: StageCreateOrConnectWithoutMatchesInput
    connect?: StageWhereUniqueInput
  }

  export type AllianceCreateNestedManyWithoutMatchInput = {
    create?: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput> | AllianceCreateWithoutMatchInput[] | AllianceUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: AllianceCreateOrConnectWithoutMatchInput | AllianceCreateOrConnectWithoutMatchInput[]
    createMany?: AllianceCreateManyMatchInputEnvelope
    connect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutScoredMatchesInput = {
    create?: XOR<UserCreateWithoutScoredMatchesInput, UserUncheckedCreateWithoutScoredMatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoredMatchesInput
    connect?: UserWhereUniqueInput
  }

  export type MatchRefereeCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput> | MatchRefereeCreateWithoutMatchInput[] | MatchRefereeUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutMatchInput | MatchRefereeCreateOrConnectWithoutMatchInput[]
    createMany?: MatchRefereeCreateManyMatchInputEnvelope
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
  }

  export type MatchScoresCreateNestedOneWithoutMatchInput = {
    create?: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
    connectOrCreate?: MatchScoresCreateOrConnectWithoutMatchInput
    connect?: MatchScoresWhereUniqueInput
  }

  export type AllianceUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput> | AllianceCreateWithoutMatchInput[] | AllianceUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: AllianceCreateOrConnectWithoutMatchInput | AllianceCreateOrConnectWithoutMatchInput[]
    createMany?: AllianceCreateManyMatchInputEnvelope
    connect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
  }

  export type MatchRefereeUncheckedCreateNestedManyWithoutMatchInput = {
    create?: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput> | MatchRefereeCreateWithoutMatchInput[] | MatchRefereeUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutMatchInput | MatchRefereeCreateOrConnectWithoutMatchInput[]
    createMany?: MatchRefereeCreateManyMatchInputEnvelope
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
  }

  export type MatchScoresUncheckedCreateNestedOneWithoutMatchInput = {
    create?: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
    connectOrCreate?: MatchScoresCreateOrConnectWithoutMatchInput
    connect?: MatchScoresWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StageUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<StageCreateWithoutMatchesInput, StageUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: StageCreateOrConnectWithoutMatchesInput
    upsert?: StageUpsertWithoutMatchesInput
    connect?: StageWhereUniqueInput
    update?: XOR<XOR<StageUpdateToOneWithWhereWithoutMatchesInput, StageUpdateWithoutMatchesInput>, StageUncheckedUpdateWithoutMatchesInput>
  }

  export type AllianceUpdateManyWithoutMatchNestedInput = {
    create?: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput> | AllianceCreateWithoutMatchInput[] | AllianceUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: AllianceCreateOrConnectWithoutMatchInput | AllianceCreateOrConnectWithoutMatchInput[]
    upsert?: AllianceUpsertWithWhereUniqueWithoutMatchInput | AllianceUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: AllianceCreateManyMatchInputEnvelope
    set?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    disconnect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    delete?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    connect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    update?: AllianceUpdateWithWhereUniqueWithoutMatchInput | AllianceUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: AllianceUpdateManyWithWhereWithoutMatchInput | AllianceUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: AllianceScalarWhereInput | AllianceScalarWhereInput[]
  }

  export type UserUpdateOneWithoutScoredMatchesNestedInput = {
    create?: XOR<UserCreateWithoutScoredMatchesInput, UserUncheckedCreateWithoutScoredMatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutScoredMatchesInput
    upsert?: UserUpsertWithoutScoredMatchesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutScoredMatchesInput, UserUpdateWithoutScoredMatchesInput>, UserUncheckedUpdateWithoutScoredMatchesInput>
  }

  export type MatchRefereeUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput> | MatchRefereeCreateWithoutMatchInput[] | MatchRefereeUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutMatchInput | MatchRefereeCreateOrConnectWithoutMatchInput[]
    upsert?: MatchRefereeUpsertWithWhereUniqueWithoutMatchInput | MatchRefereeUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchRefereeCreateManyMatchInputEnvelope
    set?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    disconnect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    delete?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    update?: MatchRefereeUpdateWithWhereUniqueWithoutMatchInput | MatchRefereeUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchRefereeUpdateManyWithWhereWithoutMatchInput | MatchRefereeUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
  }

  export type MatchScoresUpdateOneWithoutMatchNestedInput = {
    create?: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
    connectOrCreate?: MatchScoresCreateOrConnectWithoutMatchInput
    upsert?: MatchScoresUpsertWithoutMatchInput
    disconnect?: MatchScoresWhereInput | boolean
    delete?: MatchScoresWhereInput | boolean
    connect?: MatchScoresWhereUniqueInput
    update?: XOR<XOR<MatchScoresUpdateToOneWithWhereWithoutMatchInput, MatchScoresUpdateWithoutMatchInput>, MatchScoresUncheckedUpdateWithoutMatchInput>
  }

  export type AllianceUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput> | AllianceCreateWithoutMatchInput[] | AllianceUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: AllianceCreateOrConnectWithoutMatchInput | AllianceCreateOrConnectWithoutMatchInput[]
    upsert?: AllianceUpsertWithWhereUniqueWithoutMatchInput | AllianceUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: AllianceCreateManyMatchInputEnvelope
    set?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    disconnect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    delete?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    connect?: AllianceWhereUniqueInput | AllianceWhereUniqueInput[]
    update?: AllianceUpdateWithWhereUniqueWithoutMatchInput | AllianceUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: AllianceUpdateManyWithWhereWithoutMatchInput | AllianceUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: AllianceScalarWhereInput | AllianceScalarWhereInput[]
  }

  export type MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput = {
    create?: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput> | MatchRefereeCreateWithoutMatchInput[] | MatchRefereeUncheckedCreateWithoutMatchInput[]
    connectOrCreate?: MatchRefereeCreateOrConnectWithoutMatchInput | MatchRefereeCreateOrConnectWithoutMatchInput[]
    upsert?: MatchRefereeUpsertWithWhereUniqueWithoutMatchInput | MatchRefereeUpsertWithWhereUniqueWithoutMatchInput[]
    createMany?: MatchRefereeCreateManyMatchInputEnvelope
    set?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    disconnect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    delete?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    connect?: MatchRefereeWhereUniqueInput | MatchRefereeWhereUniqueInput[]
    update?: MatchRefereeUpdateWithWhereUniqueWithoutMatchInput | MatchRefereeUpdateWithWhereUniqueWithoutMatchInput[]
    updateMany?: MatchRefereeUpdateManyWithWhereWithoutMatchInput | MatchRefereeUpdateManyWithWhereWithoutMatchInput[]
    deleteMany?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
  }

  export type MatchScoresUncheckedUpdateOneWithoutMatchNestedInput = {
    create?: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
    connectOrCreate?: MatchScoresCreateOrConnectWithoutMatchInput
    upsert?: MatchScoresUpsertWithoutMatchInput
    disconnect?: MatchScoresWhereInput | boolean
    delete?: MatchScoresWhereInput | boolean
    connect?: MatchScoresWhereUniqueInput
    update?: XOR<XOR<MatchScoresUpdateToOneWithWhereWithoutMatchInput, MatchScoresUpdateWithoutMatchInput>, MatchScoresUncheckedUpdateWithoutMatchInput>
  }

  export type MatchCreateNestedOneWithoutRefereesInput = {
    create?: XOR<MatchCreateWithoutRefereesInput, MatchUncheckedCreateWithoutRefereesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutRefereesInput
    connect?: MatchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutMatchRefereesInput = {
    create?: XOR<UserCreateWithoutMatchRefereesInput, UserUncheckedCreateWithoutMatchRefereesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchRefereesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRefereeRoleFieldUpdateOperationsInput = {
    set?: $Enums.RefereeRole
  }

  export type MatchUpdateOneRequiredWithoutRefereesNestedInput = {
    create?: XOR<MatchCreateWithoutRefereesInput, MatchUncheckedCreateWithoutRefereesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutRefereesInput
    upsert?: MatchUpsertWithoutRefereesInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutRefereesInput, MatchUpdateWithoutRefereesInput>, MatchUncheckedUpdateWithoutRefereesInput>
  }

  export type UserUpdateOneRequiredWithoutMatchRefereesNestedInput = {
    create?: XOR<UserCreateWithoutMatchRefereesInput, UserUncheckedCreateWithoutMatchRefereesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMatchRefereesInput
    upsert?: UserUpsertWithoutMatchRefereesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMatchRefereesInput, UserUpdateWithoutMatchRefereesInput>, UserUncheckedUpdateWithoutMatchRefereesInput>
  }

  export type MatchCreateNestedOneWithoutAlliancesInput = {
    create?: XOR<MatchCreateWithoutAlliancesInput, MatchUncheckedCreateWithoutAlliancesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutAlliancesInput
    connect?: MatchWhereUniqueInput
  }

  export type TeamAllianceCreateNestedManyWithoutAllianceInput = {
    create?: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput> | TeamAllianceCreateWithoutAllianceInput[] | TeamAllianceUncheckedCreateWithoutAllianceInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutAllianceInput | TeamAllianceCreateOrConnectWithoutAllianceInput[]
    createMany?: TeamAllianceCreateManyAllianceInputEnvelope
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
  }

  export type AllianceScoringCreateNestedOneWithoutAllianceInput = {
    create?: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutAllianceInput
    connect?: AllianceScoringWhereUniqueInput
  }

  export type TeamAllianceUncheckedCreateNestedManyWithoutAllianceInput = {
    create?: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput> | TeamAllianceCreateWithoutAllianceInput[] | TeamAllianceUncheckedCreateWithoutAllianceInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutAllianceInput | TeamAllianceCreateOrConnectWithoutAllianceInput[]
    createMany?: TeamAllianceCreateManyAllianceInputEnvelope
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
  }

  export type AllianceScoringUncheckedCreateNestedOneWithoutAllianceInput = {
    create?: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutAllianceInput
    connect?: AllianceScoringWhereUniqueInput
  }

  export type MatchUpdateOneRequiredWithoutAlliancesNestedInput = {
    create?: XOR<MatchCreateWithoutAlliancesInput, MatchUncheckedCreateWithoutAlliancesInput>
    connectOrCreate?: MatchCreateOrConnectWithoutAlliancesInput
    upsert?: MatchUpsertWithoutAlliancesInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutAlliancesInput, MatchUpdateWithoutAlliancesInput>, MatchUncheckedUpdateWithoutAlliancesInput>
  }

  export type TeamAllianceUpdateManyWithoutAllianceNestedInput = {
    create?: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput> | TeamAllianceCreateWithoutAllianceInput[] | TeamAllianceUncheckedCreateWithoutAllianceInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutAllianceInput | TeamAllianceCreateOrConnectWithoutAllianceInput[]
    upsert?: TeamAllianceUpsertWithWhereUniqueWithoutAllianceInput | TeamAllianceUpsertWithWhereUniqueWithoutAllianceInput[]
    createMany?: TeamAllianceCreateManyAllianceInputEnvelope
    set?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    disconnect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    delete?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    update?: TeamAllianceUpdateWithWhereUniqueWithoutAllianceInput | TeamAllianceUpdateWithWhereUniqueWithoutAllianceInput[]
    updateMany?: TeamAllianceUpdateManyWithWhereWithoutAllianceInput | TeamAllianceUpdateManyWithWhereWithoutAllianceInput[]
    deleteMany?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
  }

  export type AllianceScoringUpdateOneWithoutAllianceNestedInput = {
    create?: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutAllianceInput
    upsert?: AllianceScoringUpsertWithoutAllianceInput
    disconnect?: AllianceScoringWhereInput | boolean
    delete?: AllianceScoringWhereInput | boolean
    connect?: AllianceScoringWhereUniqueInput
    update?: XOR<XOR<AllianceScoringUpdateToOneWithWhereWithoutAllianceInput, AllianceScoringUpdateWithoutAllianceInput>, AllianceScoringUncheckedUpdateWithoutAllianceInput>
  }

  export type TeamAllianceUncheckedUpdateManyWithoutAllianceNestedInput = {
    create?: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput> | TeamAllianceCreateWithoutAllianceInput[] | TeamAllianceUncheckedCreateWithoutAllianceInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutAllianceInput | TeamAllianceCreateOrConnectWithoutAllianceInput[]
    upsert?: TeamAllianceUpsertWithWhereUniqueWithoutAllianceInput | TeamAllianceUpsertWithWhereUniqueWithoutAllianceInput[]
    createMany?: TeamAllianceCreateManyAllianceInputEnvelope
    set?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    disconnect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    delete?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    update?: TeamAllianceUpdateWithWhereUniqueWithoutAllianceInput | TeamAllianceUpdateWithWhereUniqueWithoutAllianceInput[]
    updateMany?: TeamAllianceUpdateManyWithWhereWithoutAllianceInput | TeamAllianceUpdateManyWithWhereWithoutAllianceInput[]
    deleteMany?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
  }

  export type AllianceScoringUncheckedUpdateOneWithoutAllianceNestedInput = {
    create?: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
    connectOrCreate?: AllianceScoringCreateOrConnectWithoutAllianceInput
    upsert?: AllianceScoringUpsertWithoutAllianceInput
    disconnect?: AllianceScoringWhereInput | boolean
    delete?: AllianceScoringWhereInput | boolean
    connect?: AllianceScoringWhereUniqueInput
    update?: XOR<XOR<AllianceScoringUpdateToOneWithWhereWithoutAllianceInput, AllianceScoringUpdateWithoutAllianceInput>, AllianceScoringUncheckedUpdateWithoutAllianceInput>
  }

  export type AllianceCreateNestedOneWithoutAllianceScoringInput = {
    create?: XOR<AllianceCreateWithoutAllianceScoringInput, AllianceUncheckedCreateWithoutAllianceScoringInput>
    connectOrCreate?: AllianceCreateOrConnectWithoutAllianceScoringInput
    connect?: AllianceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAllianceRefForInput = {
    create?: XOR<UserCreateWithoutAllianceRefForInput, UserUncheckedCreateWithoutAllianceRefForInput>
    connectOrCreate?: UserCreateOrConnectWithoutAllianceRefForInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCardTypeFieldUpdateOperationsInput = {
    set?: $Enums.CardType
  }

  export type AllianceUpdateOneRequiredWithoutAllianceScoringNestedInput = {
    create?: XOR<AllianceCreateWithoutAllianceScoringInput, AllianceUncheckedCreateWithoutAllianceScoringInput>
    connectOrCreate?: AllianceCreateOrConnectWithoutAllianceScoringInput
    upsert?: AllianceUpsertWithoutAllianceScoringInput
    connect?: AllianceWhereUniqueInput
    update?: XOR<XOR<AllianceUpdateToOneWithWhereWithoutAllianceScoringInput, AllianceUpdateWithoutAllianceScoringInput>, AllianceUncheckedUpdateWithoutAllianceScoringInput>
  }

  export type UserUpdateOneWithoutAllianceRefForNestedInput = {
    create?: XOR<UserCreateWithoutAllianceRefForInput, UserUncheckedCreateWithoutAllianceRefForInput>
    connectOrCreate?: UserCreateOrConnectWithoutAllianceRefForInput
    upsert?: UserUpsertWithoutAllianceRefForInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAllianceRefForInput, UserUpdateWithoutAllianceRefForInput>, UserUncheckedUpdateWithoutAllianceRefForInput>
  }

  export type TournamentCreateNestedOneWithoutTeamsInput = {
    create?: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamsInput
    connect?: TournamentWhereUniqueInput
  }

  export type TeamAllianceCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput> | TeamAllianceCreateWithoutTeamInput[] | TeamAllianceUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutTeamInput | TeamAllianceCreateOrConnectWithoutTeamInput[]
    createMany?: TeamAllianceCreateManyTeamInputEnvelope
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
  }

  export type TeamStatsCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput> | TeamStatsCreateWithoutTeamInput[] | TeamStatsUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTeamInput | TeamStatsCreateOrConnectWithoutTeamInput[]
    createMany?: TeamStatsCreateManyTeamInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type TeamAllianceUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput> | TeamAllianceCreateWithoutTeamInput[] | TeamAllianceUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutTeamInput | TeamAllianceCreateOrConnectWithoutTeamInput[]
    createMany?: TeamAllianceCreateManyTeamInputEnvelope
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
  }

  export type TeamStatsUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput> | TeamStatsCreateWithoutTeamInput[] | TeamStatsUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTeamInput | TeamStatsCreateOrConnectWithoutTeamInput[]
    createMany?: TeamStatsCreateManyTeamInputEnvelope
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
  }

  export type TournamentUpdateOneWithoutTeamsNestedInput = {
    create?: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamsInput
    upsert?: TournamentUpsertWithoutTeamsInput
    disconnect?: TournamentWhereInput | boolean
    delete?: TournamentWhereInput | boolean
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutTeamsInput, TournamentUpdateWithoutTeamsInput>, TournamentUncheckedUpdateWithoutTeamsInput>
  }

  export type TeamAllianceUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput> | TeamAllianceCreateWithoutTeamInput[] | TeamAllianceUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutTeamInput | TeamAllianceCreateOrConnectWithoutTeamInput[]
    upsert?: TeamAllianceUpsertWithWhereUniqueWithoutTeamInput | TeamAllianceUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamAllianceCreateManyTeamInputEnvelope
    set?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    disconnect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    delete?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    update?: TeamAllianceUpdateWithWhereUniqueWithoutTeamInput | TeamAllianceUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamAllianceUpdateManyWithWhereWithoutTeamInput | TeamAllianceUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
  }

  export type TeamStatsUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput> | TeamStatsCreateWithoutTeamInput[] | TeamStatsUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTeamInput | TeamStatsCreateOrConnectWithoutTeamInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutTeamInput | TeamStatsUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamStatsCreateManyTeamInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutTeamInput | TeamStatsUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutTeamInput | TeamStatsUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type TeamAllianceUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput> | TeamAllianceCreateWithoutTeamInput[] | TeamAllianceUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamAllianceCreateOrConnectWithoutTeamInput | TeamAllianceCreateOrConnectWithoutTeamInput[]
    upsert?: TeamAllianceUpsertWithWhereUniqueWithoutTeamInput | TeamAllianceUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamAllianceCreateManyTeamInputEnvelope
    set?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    disconnect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    delete?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    connect?: TeamAllianceWhereUniqueInput | TeamAllianceWhereUniqueInput[]
    update?: TeamAllianceUpdateWithWhereUniqueWithoutTeamInput | TeamAllianceUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamAllianceUpdateManyWithWhereWithoutTeamInput | TeamAllianceUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
  }

  export type TeamStatsUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput> | TeamStatsCreateWithoutTeamInput[] | TeamStatsUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamStatsCreateOrConnectWithoutTeamInput | TeamStatsCreateOrConnectWithoutTeamInput[]
    upsert?: TeamStatsUpsertWithWhereUniqueWithoutTeamInput | TeamStatsUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamStatsCreateManyTeamInputEnvelope
    set?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    disconnect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    delete?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    connect?: TeamStatsWhereUniqueInput | TeamStatsWhereUniqueInput[]
    update?: TeamStatsUpdateWithWhereUniqueWithoutTeamInput | TeamStatsUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamStatsUpdateManyWithWhereWithoutTeamInput | TeamStatsUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
  }

  export type TeamCreateNestedOneWithoutTeamAlliancesInput = {
    create?: XOR<TeamCreateWithoutTeamAlliancesInput, TeamUncheckedCreateWithoutTeamAlliancesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamAlliancesInput
    connect?: TeamWhereUniqueInput
  }

  export type AllianceCreateNestedOneWithoutTeamAlliancesInput = {
    create?: XOR<AllianceCreateWithoutTeamAlliancesInput, AllianceUncheckedCreateWithoutTeamAlliancesInput>
    connectOrCreate?: AllianceCreateOrConnectWithoutTeamAlliancesInput
    connect?: AllianceWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TeamUpdateOneRequiredWithoutTeamAlliancesNestedInput = {
    create?: XOR<TeamCreateWithoutTeamAlliancesInput, TeamUncheckedCreateWithoutTeamAlliancesInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamAlliancesInput
    upsert?: TeamUpsertWithoutTeamAlliancesInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeamAlliancesInput, TeamUpdateWithoutTeamAlliancesInput>, TeamUncheckedUpdateWithoutTeamAlliancesInput>
  }

  export type AllianceUpdateOneRequiredWithoutTeamAlliancesNestedInput = {
    create?: XOR<AllianceCreateWithoutTeamAlliancesInput, AllianceUncheckedCreateWithoutTeamAlliancesInput>
    connectOrCreate?: AllianceCreateOrConnectWithoutTeamAlliancesInput
    upsert?: AllianceUpsertWithoutTeamAlliancesInput
    connect?: AllianceWhereUniqueInput
    update?: XOR<XOR<AllianceUpdateToOneWithWhereWithoutTeamAlliancesInput, AllianceUpdateWithoutTeamAlliancesInput>, AllianceUncheckedUpdateWithoutTeamAlliancesInput>
  }

  export type MatchCreateNestedOneWithoutMatchScoresInput = {
    create?: XOR<MatchCreateWithoutMatchScoresInput, MatchUncheckedCreateWithoutMatchScoresInput>
    connectOrCreate?: MatchCreateOrConnectWithoutMatchScoresInput
    connect?: MatchWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MatchUpdateOneRequiredWithoutMatchScoresNestedInput = {
    create?: XOR<MatchCreateWithoutMatchScoresInput, MatchUncheckedCreateWithoutMatchScoresInput>
    connectOrCreate?: MatchCreateOrConnectWithoutMatchScoresInput
    upsert?: MatchUpsertWithoutMatchScoresInput
    connect?: MatchWhereUniqueInput
    update?: XOR<XOR<MatchUpdateToOneWithWhereWithoutMatchScoresInput, MatchUpdateWithoutMatchScoresInput>, MatchUncheckedUpdateWithoutMatchScoresInput>
  }

  export type TeamCreateNestedOneWithoutTeamStatsInput = {
    create?: XOR<TeamCreateWithoutTeamStatsInput, TeamUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamStatsInput
    connect?: TeamWhereUniqueInput
  }

  export type TournamentCreateNestedOneWithoutTeamStatsInput = {
    create?: XOR<TournamentCreateWithoutTeamStatsInput, TournamentUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamStatsInput
    connect?: TournamentWhereUniqueInput
  }

  export type StageCreateNestedOneWithoutTeamStatsInput = {
    create?: XOR<StageCreateWithoutTeamStatsInput, StageUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: StageCreateOrConnectWithoutTeamStatsInput
    connect?: StageWhereUniqueInput
  }

  export type TeamUpdateOneRequiredWithoutTeamStatsNestedInput = {
    create?: XOR<TeamCreateWithoutTeamStatsInput, TeamUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: TeamCreateOrConnectWithoutTeamStatsInput
    upsert?: TeamUpsertWithoutTeamStatsInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutTeamStatsInput, TeamUpdateWithoutTeamStatsInput>, TeamUncheckedUpdateWithoutTeamStatsInput>
  }

  export type TournamentUpdateOneRequiredWithoutTeamStatsNestedInput = {
    create?: XOR<TournamentCreateWithoutTeamStatsInput, TournamentUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamStatsInput
    upsert?: TournamentUpsertWithoutTeamStatsInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutTeamStatsInput, TournamentUpdateWithoutTeamStatsInput>, TournamentUncheckedUpdateWithoutTeamStatsInput>
  }

  export type StageUpdateOneWithoutTeamStatsNestedInput = {
    create?: XOR<StageCreateWithoutTeamStatsInput, StageUncheckedCreateWithoutTeamStatsInput>
    connectOrCreate?: StageCreateOrConnectWithoutTeamStatsInput
    upsert?: StageUpsertWithoutTeamStatsInput
    disconnect?: StageWhereInput | boolean
    delete?: StageWhereInput | boolean
    connect?: StageWhereUniqueInput
    update?: XOR<XOR<StageUpdateToOneWithWhereWithoutTeamStatsInput, StageUpdateWithoutTeamStatsInput>, StageUncheckedUpdateWithoutTeamStatsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StageType | EnumStageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStageTypeFilter<$PrismaModel> | $Enums.StageType
  }

  export type NestedEnumStageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StageType | EnumStageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StageType[] | ListEnumStageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStageTypeWithAggregatesFilter<$PrismaModel> | $Enums.StageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStageTypeFilter<$PrismaModel>
    _max?: NestedEnumStageTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRefereeRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.RefereeRole | EnumRefereeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRefereeRoleFilter<$PrismaModel> | $Enums.RefereeRole
  }

  export type NestedEnumRefereeRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RefereeRole | EnumRefereeRoleFieldRefInput<$PrismaModel>
    in?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.RefereeRole[] | ListEnumRefereeRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRefereeRoleWithAggregatesFilter<$PrismaModel> | $Enums.RefereeRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRefereeRoleFilter<$PrismaModel>
    _max?: NestedEnumRefereeRoleFilter<$PrismaModel>
  }

  export type NestedEnumCardTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCardTypeFilter<$PrismaModel> | $Enums.CardType
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumCardTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CardType | EnumCardTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CardType[] | ListEnumCardTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCardTypeWithAggregatesFilter<$PrismaModel> | $Enums.CardType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCardTypeFilter<$PrismaModel>
    _max?: NestedEnumCardTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserCreateWithoutCreatedUsersInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedUsersInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
  }

  export type UserCreateWithoutCreatedByInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedByInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
  }

  export type UserCreateManyCreatedByInputEnvelope = {
    data: UserCreateManyCreatedByInput | UserCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TournamentCreateWithoutAdminInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: StageCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutAdminInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    stages?: StageUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutAdminInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput>
  }

  export type TournamentCreateManyAdminInputEnvelope = {
    data: TournamentCreateManyAdminInput | TournamentCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutScoredByInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stage: StageCreateNestedOneWithoutMatchesInput
    alliances?: AllianceCreateNestedManyWithoutMatchInput
    referees?: MatchRefereeCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutScoredByInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceUncheckedCreateNestedManyWithoutMatchInput
    referees?: MatchRefereeUncheckedCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutScoredByInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput>
  }

  export type MatchCreateManyScoredByInputEnvelope = {
    data: MatchCreateManyScoredByInput | MatchCreateManyScoredByInput[]
    skipDuplicates?: boolean
  }

  export type AllianceScoringCreateWithoutRefereeInput = {
    id?: string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliance: AllianceCreateNestedOneWithoutAllianceScoringInput
  }

  export type AllianceScoringUncheckedCreateWithoutRefereeInput = {
    id?: string
    allianceId: string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceScoringCreateOrConnectWithoutRefereeInput = {
    where: AllianceScoringWhereUniqueInput
    create: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput>
  }

  export type AllianceScoringCreateManyRefereeInputEnvelope = {
    data: AllianceScoringCreateManyRefereeInput | AllianceScoringCreateManyRefereeInput[]
    skipDuplicates?: boolean
  }

  export type MatchRefereeCreateWithoutUserInput = {
    id?: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutRefereesInput
  }

  export type MatchRefereeUncheckedCreateWithoutUserInput = {
    id?: string
    matchId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeCreateOrConnectWithoutUserInput = {
    where: MatchRefereeWhereUniqueInput
    create: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput>
  }

  export type MatchRefereeCreateManyUserInputEnvelope = {
    data: MatchRefereeCreateManyUserInput | MatchRefereeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedUsersInput = {
    update: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
    create: XOR<UserCreateWithoutCreatedUsersInput, UserUncheckedCreateWithoutCreatedUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedUsersInput, UserUncheckedUpdateWithoutCreatedUsersInput>
  }

  export type UserUpdateWithoutCreatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
    create: XOR<UserCreateWithoutCreatedByInput, UserUncheckedCreateWithoutCreatedByInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCreatedByInput, UserUncheckedUpdateWithoutCreatedByInput>
  }

  export type UserUpdateManyWithWhereWithoutCreatedByInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    email?: StringNullableFilter<"User"> | string | null
    gender?: BoolNullableFilter<"User"> | boolean | null
    DateOfBirth?: DateTimeNullableFilter<"User"> | Date | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdById?: StringNullableFilter<"User"> | string | null
  }

  export type TournamentUpsertWithWhereUniqueWithoutAdminInput = {
    where: TournamentWhereUniqueInput
    update: XOR<TournamentUpdateWithoutAdminInput, TournamentUncheckedUpdateWithoutAdminInput>
    create: XOR<TournamentCreateWithoutAdminInput, TournamentUncheckedCreateWithoutAdminInput>
  }

  export type TournamentUpdateWithWhereUniqueWithoutAdminInput = {
    where: TournamentWhereUniqueInput
    data: XOR<TournamentUpdateWithoutAdminInput, TournamentUncheckedUpdateWithoutAdminInput>
  }

  export type TournamentUpdateManyWithWhereWithoutAdminInput = {
    where: TournamentScalarWhereInput
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyWithoutAdminInput>
  }

  export type TournamentScalarWhereInput = {
    AND?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    OR?: TournamentScalarWhereInput[]
    NOT?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    id?: StringFilter<"Tournament"> | string
    name?: StringFilter<"Tournament"> | string
    description?: StringNullableFilter<"Tournament"> | string | null
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    endDate?: DateTimeFilter<"Tournament"> | Date | string
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    adminId?: StringFilter<"Tournament"> | string
  }

  export type MatchUpsertWithWhereUniqueWithoutScoredByInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutScoredByInput, MatchUncheckedUpdateWithoutScoredByInput>
    create: XOR<MatchCreateWithoutScoredByInput, MatchUncheckedCreateWithoutScoredByInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutScoredByInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutScoredByInput, MatchUncheckedUpdateWithoutScoredByInput>
  }

  export type MatchUpdateManyWithWhereWithoutScoredByInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutScoredByInput>
  }

  export type MatchScalarWhereInput = {
    AND?: MatchScalarWhereInput | MatchScalarWhereInput[]
    OR?: MatchScalarWhereInput[]
    NOT?: MatchScalarWhereInput | MatchScalarWhereInput[]
    id?: StringFilter<"Match"> | string
    matchNumber?: IntFilter<"Match"> | number
    roundNumber?: IntNullableFilter<"Match"> | number | null
    status?: StringFilter<"Match"> | string
    startTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    scheduledTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    endTime?: DateTimeNullableFilter<"Match"> | Date | string | null
    duration?: IntNullableFilter<"Match"> | number | null
    winningAlliance?: StringNullableFilter<"Match"> | string | null
    stageId?: StringFilter<"Match"> | string
    scoredById?: StringNullableFilter<"Match"> | string | null
    createdAt?: DateTimeFilter<"Match"> | Date | string
    updatedAt?: DateTimeFilter<"Match"> | Date | string
  }

  export type AllianceScoringUpsertWithWhereUniqueWithoutRefereeInput = {
    where: AllianceScoringWhereUniqueInput
    update: XOR<AllianceScoringUpdateWithoutRefereeInput, AllianceScoringUncheckedUpdateWithoutRefereeInput>
    create: XOR<AllianceScoringCreateWithoutRefereeInput, AllianceScoringUncheckedCreateWithoutRefereeInput>
  }

  export type AllianceScoringUpdateWithWhereUniqueWithoutRefereeInput = {
    where: AllianceScoringWhereUniqueInput
    data: XOR<AllianceScoringUpdateWithoutRefereeInput, AllianceScoringUncheckedUpdateWithoutRefereeInput>
  }

  export type AllianceScoringUpdateManyWithWhereWithoutRefereeInput = {
    where: AllianceScoringScalarWhereInput
    data: XOR<AllianceScoringUpdateManyMutationInput, AllianceScoringUncheckedUpdateManyWithoutRefereeInput>
  }

  export type AllianceScoringScalarWhereInput = {
    AND?: AllianceScoringScalarWhereInput | AllianceScoringScalarWhereInput[]
    OR?: AllianceScoringScalarWhereInput[]
    NOT?: AllianceScoringScalarWhereInput | AllianceScoringScalarWhereInput[]
    id?: StringFilter<"AllianceScoring"> | string
    allianceId?: StringFilter<"AllianceScoring"> | string
    refereeId?: StringNullableFilter<"AllianceScoring"> | string | null
    scoreDetails?: JsonNullableFilter<"AllianceScoring">
    card?: EnumCardTypeFilter<"AllianceScoring"> | $Enums.CardType
    notes?: StringNullableFilter<"AllianceScoring"> | string | null
    createdAt?: DateTimeFilter<"AllianceScoring"> | Date | string
    updatedAt?: DateTimeFilter<"AllianceScoring"> | Date | string
  }

  export type MatchRefereeUpsertWithWhereUniqueWithoutUserInput = {
    where: MatchRefereeWhereUniqueInput
    update: XOR<MatchRefereeUpdateWithoutUserInput, MatchRefereeUncheckedUpdateWithoutUserInput>
    create: XOR<MatchRefereeCreateWithoutUserInput, MatchRefereeUncheckedCreateWithoutUserInput>
  }

  export type MatchRefereeUpdateWithWhereUniqueWithoutUserInput = {
    where: MatchRefereeWhereUniqueInput
    data: XOR<MatchRefereeUpdateWithoutUserInput, MatchRefereeUncheckedUpdateWithoutUserInput>
  }

  export type MatchRefereeUpdateManyWithWhereWithoutUserInput = {
    where: MatchRefereeScalarWhereInput
    data: XOR<MatchRefereeUpdateManyMutationInput, MatchRefereeUncheckedUpdateManyWithoutUserInput>
  }

  export type MatchRefereeScalarWhereInput = {
    AND?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
    OR?: MatchRefereeScalarWhereInput[]
    NOT?: MatchRefereeScalarWhereInput | MatchRefereeScalarWhereInput[]
    id?: StringFilter<"MatchReferee"> | string
    matchId?: StringFilter<"MatchReferee"> | string
    userId?: StringFilter<"MatchReferee"> | string
    role?: EnumRefereeRoleFilter<"MatchReferee"> | $Enums.RefereeRole
    position?: StringNullableFilter<"MatchReferee"> | string | null
    createdAt?: DateTimeFilter<"MatchReferee"> | Date | string
    updatedAt?: DateTimeFilter<"MatchReferee"> | Date | string
  }

  export type UserCreateWithoutTournamentsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTournamentsInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTournamentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTournamentsInput, UserUncheckedCreateWithoutTournamentsInput>
  }

  export type StageCreateWithoutTournamentInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: MatchCreateNestedManyWithoutStageInput
    teamStats?: TeamStatsCreateNestedManyWithoutStageInput
  }

  export type StageUncheckedCreateWithoutTournamentInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: MatchUncheckedCreateNestedManyWithoutStageInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutStageInput
  }

  export type StageCreateOrConnectWithoutTournamentInput = {
    where: StageWhereUniqueInput
    create: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput>
  }

  export type StageCreateManyTournamentInputEnvelope = {
    data: StageCreateManyTournamentInput | StageCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutTournamentInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceCreateNestedManyWithoutTeamInput
    teamStats?: TeamStatsCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTournamentInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutTeamInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput>
  }

  export type TeamCreateManyTournamentInputEnvelope = {
    data: TeamCreateManyTournamentInput | TeamCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type TeamStatsCreateWithoutTournamentInput = {
    id?: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutTeamStatsInput
    stage?: StageCreateNestedOneWithoutTeamStatsInput
  }

  export type TeamStatsUncheckedCreateWithoutTournamentInput = {
    id?: string
    teamId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateOrConnectWithoutTournamentInput = {
    where: TeamStatsWhereUniqueInput
    create: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput>
  }

  export type TeamStatsCreateManyTournamentInputEnvelope = {
    data: TeamStatsCreateManyTournamentInput | TeamStatsCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTournamentsInput = {
    update: XOR<UserUpdateWithoutTournamentsInput, UserUncheckedUpdateWithoutTournamentsInput>
    create: XOR<UserCreateWithoutTournamentsInput, UserUncheckedCreateWithoutTournamentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTournamentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTournamentsInput, UserUncheckedUpdateWithoutTournamentsInput>
  }

  export type UserUpdateWithoutTournamentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTournamentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StageUpsertWithWhereUniqueWithoutTournamentInput = {
    where: StageWhereUniqueInput
    update: XOR<StageUpdateWithoutTournamentInput, StageUncheckedUpdateWithoutTournamentInput>
    create: XOR<StageCreateWithoutTournamentInput, StageUncheckedCreateWithoutTournamentInput>
  }

  export type StageUpdateWithWhereUniqueWithoutTournamentInput = {
    where: StageWhereUniqueInput
    data: XOR<StageUpdateWithoutTournamentInput, StageUncheckedUpdateWithoutTournamentInput>
  }

  export type StageUpdateManyWithWhereWithoutTournamentInput = {
    where: StageScalarWhereInput
    data: XOR<StageUpdateManyMutationInput, StageUncheckedUpdateManyWithoutTournamentInput>
  }

  export type StageScalarWhereInput = {
    AND?: StageScalarWhereInput | StageScalarWhereInput[]
    OR?: StageScalarWhereInput[]
    NOT?: StageScalarWhereInput | StageScalarWhereInput[]
    id?: StringFilter<"Stage"> | string
    name?: StringFilter<"Stage"> | string
    type?: EnumStageTypeFilter<"Stage"> | $Enums.StageType
    startDate?: DateTimeFilter<"Stage"> | Date | string
    endDate?: DateTimeFilter<"Stage"> | Date | string
    tournamentId?: StringFilter<"Stage"> | string
    createdAt?: DateTimeFilter<"Stage"> | Date | string
    updatedAt?: DateTimeFilter<"Stage"> | Date | string
  }

  export type TeamUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutTournamentInput, TeamUncheckedUpdateWithoutTournamentInput>
    create: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutTournamentInput, TeamUncheckedUpdateWithoutTournamentInput>
  }

  export type TeamUpdateManyWithWhereWithoutTournamentInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: StringFilter<"Team"> | string
    teamNumber?: StringFilter<"Team"> | string
    name?: StringFilter<"Team"> | string
    organization?: StringNullableFilter<"Team"> | string | null
    avatar?: StringNullableFilter<"Team"> | string | null
    description?: StringNullableFilter<"Team"> | string | null
    teamMembers?: JsonNullableFilter<"Team">
    tournamentId?: StringNullableFilter<"Team"> | string | null
    createdAt?: DateTimeFilter<"Team"> | Date | string
    updatedAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type TeamStatsUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TeamStatsWhereUniqueInput
    update: XOR<TeamStatsUpdateWithoutTournamentInput, TeamStatsUncheckedUpdateWithoutTournamentInput>
    create: XOR<TeamStatsCreateWithoutTournamentInput, TeamStatsUncheckedCreateWithoutTournamentInput>
  }

  export type TeamStatsUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TeamStatsWhereUniqueInput
    data: XOR<TeamStatsUpdateWithoutTournamentInput, TeamStatsUncheckedUpdateWithoutTournamentInput>
  }

  export type TeamStatsUpdateManyWithWhereWithoutTournamentInput = {
    where: TeamStatsScalarWhereInput
    data: XOR<TeamStatsUpdateManyMutationInput, TeamStatsUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TeamStatsScalarWhereInput = {
    AND?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
    OR?: TeamStatsScalarWhereInput[]
    NOT?: TeamStatsScalarWhereInput | TeamStatsScalarWhereInput[]
    id?: StringFilter<"TeamStats"> | string
    teamId?: StringFilter<"TeamStats"> | string
    tournamentId?: StringFilter<"TeamStats"> | string
    stageId?: StringNullableFilter<"TeamStats"> | string | null
    wins?: IntFilter<"TeamStats"> | number
    losses?: IntFilter<"TeamStats"> | number
    ties?: IntFilter<"TeamStats"> | number
    matchesPlayed?: IntFilter<"TeamStats"> | number
    rank?: IntNullableFilter<"TeamStats"> | number | null
    tiebreaker1?: FloatFilter<"TeamStats"> | number
    tiebreaker2?: FloatFilter<"TeamStats"> | number
    createdAt?: DateTimeFilter<"TeamStats"> | Date | string
    updatedAt?: DateTimeFilter<"TeamStats"> | Date | string
  }

  export type TournamentCreateWithoutStagesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutTournamentsInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutStagesInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId: string
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutStagesInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutStagesInput, TournamentUncheckedCreateWithoutStagesInput>
  }

  export type MatchCreateWithoutStageInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceCreateNestedManyWithoutMatchInput
    scoredBy?: UserCreateNestedOneWithoutScoredMatchesInput
    referees?: MatchRefereeCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutStageInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceUncheckedCreateNestedManyWithoutMatchInput
    referees?: MatchRefereeUncheckedCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutStageInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput>
  }

  export type MatchCreateManyStageInputEnvelope = {
    data: MatchCreateManyStageInput | MatchCreateManyStageInput[]
    skipDuplicates?: boolean
  }

  export type TeamStatsCreateWithoutStageInput = {
    id?: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutTeamStatsInput
    tournament: TournamentCreateNestedOneWithoutTeamStatsInput
  }

  export type TeamStatsUncheckedCreateWithoutStageInput = {
    id?: string
    teamId: string
    tournamentId: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateOrConnectWithoutStageInput = {
    where: TeamStatsWhereUniqueInput
    create: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput>
  }

  export type TeamStatsCreateManyStageInputEnvelope = {
    data: TeamStatsCreateManyStageInput | TeamStatsCreateManyStageInput[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithoutStagesInput = {
    update: XOR<TournamentUpdateWithoutStagesInput, TournamentUncheckedUpdateWithoutStagesInput>
    create: XOR<TournamentCreateWithoutStagesInput, TournamentUncheckedCreateWithoutStagesInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutStagesInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutStagesInput, TournamentUncheckedUpdateWithoutStagesInput>
  }

  export type TournamentUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutTournamentsNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutStagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: StringFieldUpdateOperationsInput | string
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type MatchUpsertWithWhereUniqueWithoutStageInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutStageInput, MatchUncheckedUpdateWithoutStageInput>
    create: XOR<MatchCreateWithoutStageInput, MatchUncheckedCreateWithoutStageInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutStageInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutStageInput, MatchUncheckedUpdateWithoutStageInput>
  }

  export type MatchUpdateManyWithWhereWithoutStageInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutStageInput>
  }

  export type TeamStatsUpsertWithWhereUniqueWithoutStageInput = {
    where: TeamStatsWhereUniqueInput
    update: XOR<TeamStatsUpdateWithoutStageInput, TeamStatsUncheckedUpdateWithoutStageInput>
    create: XOR<TeamStatsCreateWithoutStageInput, TeamStatsUncheckedCreateWithoutStageInput>
  }

  export type TeamStatsUpdateWithWhereUniqueWithoutStageInput = {
    where: TeamStatsWhereUniqueInput
    data: XOR<TeamStatsUpdateWithoutStageInput, TeamStatsUncheckedUpdateWithoutStageInput>
  }

  export type TeamStatsUpdateManyWithWhereWithoutStageInput = {
    where: TeamStatsScalarWhereInput
    data: XOR<TeamStatsUpdateManyMutationInput, TeamStatsUncheckedUpdateManyWithoutStageInput>
  }

  export type StageCreateWithoutMatchesInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutStagesInput
    teamStats?: TeamStatsCreateNestedManyWithoutStageInput
  }

  export type StageUncheckedCreateWithoutMatchesInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    tournamentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutStageInput
  }

  export type StageCreateOrConnectWithoutMatchesInput = {
    where: StageWhereUniqueInput
    create: XOR<StageCreateWithoutMatchesInput, StageUncheckedCreateWithoutMatchesInput>
  }

  export type AllianceCreateWithoutMatchInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceCreateNestedManyWithoutAllianceInput
    allianceScoring?: AllianceScoringCreateNestedOneWithoutAllianceInput
  }

  export type AllianceUncheckedCreateWithoutMatchInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutAllianceInput
    allianceScoring?: AllianceScoringUncheckedCreateNestedOneWithoutAllianceInput
  }

  export type AllianceCreateOrConnectWithoutMatchInput = {
    where: AllianceWhereUniqueInput
    create: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput>
  }

  export type AllianceCreateManyMatchInputEnvelope = {
    data: AllianceCreateManyMatchInput | AllianceCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutScoredMatchesInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutScoredMatchesInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutScoredMatchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutScoredMatchesInput, UserUncheckedCreateWithoutScoredMatchesInput>
  }

  export type MatchRefereeCreateWithoutMatchInput = {
    id?: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMatchRefereesInput
  }

  export type MatchRefereeUncheckedCreateWithoutMatchInput = {
    id?: string
    userId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeCreateOrConnectWithoutMatchInput = {
    where: MatchRefereeWhereUniqueInput
    create: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput>
  }

  export type MatchRefereeCreateManyMatchInputEnvelope = {
    data: MatchRefereeCreateManyMatchInput | MatchRefereeCreateManyMatchInput[]
    skipDuplicates?: boolean
  }

  export type MatchScoresCreateWithoutMatchInput = {
    id?: string
    redAutoScore?: number
    redDriveScore?: number
    redTotalScore?: number
    blueAutoScore?: number
    blueDriveScore?: number
    blueTotalScore?: number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: number
    redMultiplier?: number
    blueTeamCount?: number
    blueMultiplier?: number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchScoresUncheckedCreateWithoutMatchInput = {
    id?: string
    redAutoScore?: number
    redDriveScore?: number
    redTotalScore?: number
    blueAutoScore?: number
    blueDriveScore?: number
    blueTotalScore?: number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: number
    redMultiplier?: number
    blueTeamCount?: number
    blueMultiplier?: number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchScoresCreateOrConnectWithoutMatchInput = {
    where: MatchScoresWhereUniqueInput
    create: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
  }

  export type StageUpsertWithoutMatchesInput = {
    update: XOR<StageUpdateWithoutMatchesInput, StageUncheckedUpdateWithoutMatchesInput>
    create: XOR<StageCreateWithoutMatchesInput, StageUncheckedCreateWithoutMatchesInput>
    where?: StageWhereInput
  }

  export type StageUpdateToOneWithWhereWithoutMatchesInput = {
    where?: StageWhereInput
    data: XOR<StageUpdateWithoutMatchesInput, StageUncheckedUpdateWithoutMatchesInput>
  }

  export type StageUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutStagesNestedInput
    teamStats?: TeamStatsUpdateManyWithoutStageNestedInput
  }

  export type StageUncheckedUpdateWithoutMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamStats?: TeamStatsUncheckedUpdateManyWithoutStageNestedInput
  }

  export type AllianceUpsertWithWhereUniqueWithoutMatchInput = {
    where: AllianceWhereUniqueInput
    update: XOR<AllianceUpdateWithoutMatchInput, AllianceUncheckedUpdateWithoutMatchInput>
    create: XOR<AllianceCreateWithoutMatchInput, AllianceUncheckedCreateWithoutMatchInput>
  }

  export type AllianceUpdateWithWhereUniqueWithoutMatchInput = {
    where: AllianceWhereUniqueInput
    data: XOR<AllianceUpdateWithoutMatchInput, AllianceUncheckedUpdateWithoutMatchInput>
  }

  export type AllianceUpdateManyWithWhereWithoutMatchInput = {
    where: AllianceScalarWhereInput
    data: XOR<AllianceUpdateManyMutationInput, AllianceUncheckedUpdateManyWithoutMatchInput>
  }

  export type AllianceScalarWhereInput = {
    AND?: AllianceScalarWhereInput | AllianceScalarWhereInput[]
    OR?: AllianceScalarWhereInput[]
    NOT?: AllianceScalarWhereInput | AllianceScalarWhereInput[]
    id?: StringFilter<"Alliance"> | string
    color?: StringFilter<"Alliance"> | string
    score?: IntFilter<"Alliance"> | number
    matchId?: StringFilter<"Alliance"> | string
    createdAt?: DateTimeFilter<"Alliance"> | Date | string
    updatedAt?: DateTimeFilter<"Alliance"> | Date | string
  }

  export type UserUpsertWithoutScoredMatchesInput = {
    update: XOR<UserUpdateWithoutScoredMatchesInput, UserUncheckedUpdateWithoutScoredMatchesInput>
    create: XOR<UserCreateWithoutScoredMatchesInput, UserUncheckedCreateWithoutScoredMatchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutScoredMatchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutScoredMatchesInput, UserUncheckedUpdateWithoutScoredMatchesInput>
  }

  export type UserUpdateWithoutScoredMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutScoredMatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MatchRefereeUpsertWithWhereUniqueWithoutMatchInput = {
    where: MatchRefereeWhereUniqueInput
    update: XOR<MatchRefereeUpdateWithoutMatchInput, MatchRefereeUncheckedUpdateWithoutMatchInput>
    create: XOR<MatchRefereeCreateWithoutMatchInput, MatchRefereeUncheckedCreateWithoutMatchInput>
  }

  export type MatchRefereeUpdateWithWhereUniqueWithoutMatchInput = {
    where: MatchRefereeWhereUniqueInput
    data: XOR<MatchRefereeUpdateWithoutMatchInput, MatchRefereeUncheckedUpdateWithoutMatchInput>
  }

  export type MatchRefereeUpdateManyWithWhereWithoutMatchInput = {
    where: MatchRefereeScalarWhereInput
    data: XOR<MatchRefereeUpdateManyMutationInput, MatchRefereeUncheckedUpdateManyWithoutMatchInput>
  }

  export type MatchScoresUpsertWithoutMatchInput = {
    update: XOR<MatchScoresUpdateWithoutMatchInput, MatchScoresUncheckedUpdateWithoutMatchInput>
    create: XOR<MatchScoresCreateWithoutMatchInput, MatchScoresUncheckedCreateWithoutMatchInput>
    where?: MatchScoresWhereInput
  }

  export type MatchScoresUpdateToOneWithWhereWithoutMatchInput = {
    where?: MatchScoresWhereInput
    data: XOR<MatchScoresUpdateWithoutMatchInput, MatchScoresUncheckedUpdateWithoutMatchInput>
  }

  export type MatchScoresUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchScoresUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    redAutoScore?: IntFieldUpdateOperationsInput | number
    redDriveScore?: IntFieldUpdateOperationsInput | number
    redTotalScore?: IntFieldUpdateOperationsInput | number
    blueAutoScore?: IntFieldUpdateOperationsInput | number
    blueDriveScore?: IntFieldUpdateOperationsInput | number
    blueTotalScore?: IntFieldUpdateOperationsInput | number
    redGameElements?: NullableJsonNullValueInput | InputJsonValue
    blueGameElements?: NullableJsonNullValueInput | InputJsonValue
    redTeamCount?: IntFieldUpdateOperationsInput | number
    redMultiplier?: FloatFieldUpdateOperationsInput | number
    blueTeamCount?: IntFieldUpdateOperationsInput | number
    blueMultiplier?: FloatFieldUpdateOperationsInput | number
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateWithoutRefereesInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stage: StageCreateNestedOneWithoutMatchesInput
    alliances?: AllianceCreateNestedManyWithoutMatchInput
    scoredBy?: UserCreateNestedOneWithoutScoredMatchesInput
    matchScores?: MatchScoresCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutRefereesInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceUncheckedCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutRefereesInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutRefereesInput, MatchUncheckedCreateWithoutRefereesInput>
  }

  export type UserCreateWithoutMatchRefereesInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringCreateNestedManyWithoutRefereeInput
  }

  export type UserUncheckedCreateWithoutMatchRefereesInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    allianceRefFor?: AllianceScoringUncheckedCreateNestedManyWithoutRefereeInput
  }

  export type UserCreateOrConnectWithoutMatchRefereesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMatchRefereesInput, UserUncheckedCreateWithoutMatchRefereesInput>
  }

  export type MatchUpsertWithoutRefereesInput = {
    update: XOR<MatchUpdateWithoutRefereesInput, MatchUncheckedUpdateWithoutRefereesInput>
    create: XOR<MatchCreateWithoutRefereesInput, MatchUncheckedCreateWithoutRefereesInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutRefereesInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutRefereesInput, MatchUncheckedUpdateWithoutRefereesInput>
  }

  export type MatchUpdateWithoutRefereesInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: StageUpdateOneRequiredWithoutMatchesNestedInput
    alliances?: AllianceUpdateManyWithoutMatchNestedInput
    scoredBy?: UserUpdateOneWithoutScoredMatchesNestedInput
    matchScores?: MatchScoresUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutRefereesInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUncheckedUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type UserUpsertWithoutMatchRefereesInput = {
    update: XOR<UserUpdateWithoutMatchRefereesInput, UserUncheckedUpdateWithoutMatchRefereesInput>
    create: XOR<UserCreateWithoutMatchRefereesInput, UserUncheckedCreateWithoutMatchRefereesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMatchRefereesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMatchRefereesInput, UserUncheckedUpdateWithoutMatchRefereesInput>
  }

  export type UserUpdateWithoutMatchRefereesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
  }

  export type UserUncheckedUpdateWithoutMatchRefereesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
  }

  export type MatchCreateWithoutAlliancesInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stage: StageCreateNestedOneWithoutMatchesInput
    scoredBy?: UserCreateNestedOneWithoutScoredMatchesInput
    referees?: MatchRefereeCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresCreateNestedOneWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutAlliancesInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referees?: MatchRefereeUncheckedCreateNestedManyWithoutMatchInput
    matchScores?: MatchScoresUncheckedCreateNestedOneWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutAlliancesInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutAlliancesInput, MatchUncheckedCreateWithoutAlliancesInput>
  }

  export type TeamAllianceCreateWithoutAllianceInput = {
    id?: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    team: TeamCreateNestedOneWithoutTeamAlliancesInput
  }

  export type TeamAllianceUncheckedCreateWithoutAllianceInput = {
    id?: string
    teamId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceCreateOrConnectWithoutAllianceInput = {
    where: TeamAllianceWhereUniqueInput
    create: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput>
  }

  export type TeamAllianceCreateManyAllianceInputEnvelope = {
    data: TeamAllianceCreateManyAllianceInput | TeamAllianceCreateManyAllianceInput[]
    skipDuplicates?: boolean
  }

  export type AllianceScoringCreateWithoutAllianceInput = {
    id?: string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    referee?: UserCreateNestedOneWithoutAllianceRefForInput
  }

  export type AllianceScoringUncheckedCreateWithoutAllianceInput = {
    id?: string
    refereeId?: string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceScoringCreateOrConnectWithoutAllianceInput = {
    where: AllianceScoringWhereUniqueInput
    create: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
  }

  export type MatchUpsertWithoutAlliancesInput = {
    update: XOR<MatchUpdateWithoutAlliancesInput, MatchUncheckedUpdateWithoutAlliancesInput>
    create: XOR<MatchCreateWithoutAlliancesInput, MatchUncheckedCreateWithoutAlliancesInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutAlliancesInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutAlliancesInput, MatchUncheckedUpdateWithoutAlliancesInput>
  }

  export type MatchUpdateWithoutAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: StageUpdateOneRequiredWithoutMatchesNestedInput
    scoredBy?: UserUpdateOneWithoutScoredMatchesNestedInput
    referees?: MatchRefereeUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referees?: MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type TeamAllianceUpsertWithWhereUniqueWithoutAllianceInput = {
    where: TeamAllianceWhereUniqueInput
    update: XOR<TeamAllianceUpdateWithoutAllianceInput, TeamAllianceUncheckedUpdateWithoutAllianceInput>
    create: XOR<TeamAllianceCreateWithoutAllianceInput, TeamAllianceUncheckedCreateWithoutAllianceInput>
  }

  export type TeamAllianceUpdateWithWhereUniqueWithoutAllianceInput = {
    where: TeamAllianceWhereUniqueInput
    data: XOR<TeamAllianceUpdateWithoutAllianceInput, TeamAllianceUncheckedUpdateWithoutAllianceInput>
  }

  export type TeamAllianceUpdateManyWithWhereWithoutAllianceInput = {
    where: TeamAllianceScalarWhereInput
    data: XOR<TeamAllianceUpdateManyMutationInput, TeamAllianceUncheckedUpdateManyWithoutAllianceInput>
  }

  export type TeamAllianceScalarWhereInput = {
    AND?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
    OR?: TeamAllianceScalarWhereInput[]
    NOT?: TeamAllianceScalarWhereInput | TeamAllianceScalarWhereInput[]
    id?: StringFilter<"TeamAlliance"> | string
    teamId?: StringFilter<"TeamAlliance"> | string
    allianceId?: StringFilter<"TeamAlliance"> | string
    stationPosition?: IntFilter<"TeamAlliance"> | number
    isSurrogate?: BoolFilter<"TeamAlliance"> | boolean
    createdAt?: DateTimeFilter<"TeamAlliance"> | Date | string
    updatedAt?: DateTimeFilter<"TeamAlliance"> | Date | string
  }

  export type AllianceScoringUpsertWithoutAllianceInput = {
    update: XOR<AllianceScoringUpdateWithoutAllianceInput, AllianceScoringUncheckedUpdateWithoutAllianceInput>
    create: XOR<AllianceScoringCreateWithoutAllianceInput, AllianceScoringUncheckedCreateWithoutAllianceInput>
    where?: AllianceScoringWhereInput
  }

  export type AllianceScoringUpdateToOneWithWhereWithoutAllianceInput = {
    where?: AllianceScoringWhereInput
    data: XOR<AllianceScoringUpdateWithoutAllianceInput, AllianceScoringUncheckedUpdateWithoutAllianceInput>
  }

  export type AllianceScoringUpdateWithoutAllianceInput = {
    id?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    referee?: UserUpdateOneWithoutAllianceRefForNestedInput
  }

  export type AllianceScoringUncheckedUpdateWithoutAllianceInput = {
    id?: StringFieldUpdateOperationsInput | string
    refereeId?: NullableStringFieldUpdateOperationsInput | string | null
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceCreateWithoutAllianceScoringInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutAlliancesInput
    teamAlliances?: TeamAllianceCreateNestedManyWithoutAllianceInput
  }

  export type AllianceUncheckedCreateWithoutAllianceScoringInput = {
    id?: string
    color: string
    score?: number
    matchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutAllianceInput
  }

  export type AllianceCreateOrConnectWithoutAllianceScoringInput = {
    where: AllianceWhereUniqueInput
    create: XOR<AllianceCreateWithoutAllianceScoringInput, AllianceUncheckedCreateWithoutAllianceScoringInput>
  }

  export type UserCreateWithoutAllianceRefForInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedUsersInput
    createdUsers?: UserCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchCreateNestedManyWithoutScoredByInput
    matchReferees?: MatchRefereeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAllianceRefForInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    createdUsers?: UserUncheckedCreateNestedManyWithoutCreatedByInput
    tournaments?: TournamentUncheckedCreateNestedManyWithoutAdminInput
    scoredMatches?: MatchUncheckedCreateNestedManyWithoutScoredByInput
    matchReferees?: MatchRefereeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAllianceRefForInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAllianceRefForInput, UserUncheckedCreateWithoutAllianceRefForInput>
  }

  export type AllianceUpsertWithoutAllianceScoringInput = {
    update: XOR<AllianceUpdateWithoutAllianceScoringInput, AllianceUncheckedUpdateWithoutAllianceScoringInput>
    create: XOR<AllianceCreateWithoutAllianceScoringInput, AllianceUncheckedCreateWithoutAllianceScoringInput>
    where?: AllianceWhereInput
  }

  export type AllianceUpdateToOneWithWhereWithoutAllianceScoringInput = {
    where?: AllianceWhereInput
    data: XOR<AllianceUpdateWithoutAllianceScoringInput, AllianceUncheckedUpdateWithoutAllianceScoringInput>
  }

  export type AllianceUpdateWithoutAllianceScoringInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutAlliancesNestedInput
    teamAlliances?: TeamAllianceUpdateManyWithoutAllianceNestedInput
  }

  export type AllianceUncheckedUpdateWithoutAllianceScoringInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutAllianceNestedInput
  }

  export type UserUpsertWithoutAllianceRefForInput = {
    update: XOR<UserUpdateWithoutAllianceRefForInput, UserUncheckedUpdateWithoutAllianceRefForInput>
    create: XOR<UserCreateWithoutAllianceRefForInput, UserUncheckedCreateWithoutAllianceRefForInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAllianceRefForInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAllianceRefForInput, UserUncheckedUpdateWithoutAllianceRefForInput>
  }

  export type UserUpdateWithoutAllianceRefForInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedUsersNestedInput
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAllianceRefForInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TournamentCreateWithoutTeamsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutTournamentsInput
    stages?: StageCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutTeamsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId: string
    stages?: StageUncheckedCreateNestedManyWithoutTournamentInput
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutTeamsInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
  }

  export type TeamAllianceCreateWithoutTeamInput = {
    id?: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    alliance: AllianceCreateNestedOneWithoutTeamAlliancesInput
  }

  export type TeamAllianceUncheckedCreateWithoutTeamInput = {
    id?: string
    allianceId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceCreateOrConnectWithoutTeamInput = {
    where: TeamAllianceWhereUniqueInput
    create: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput>
  }

  export type TeamAllianceCreateManyTeamInputEnvelope = {
    data: TeamAllianceCreateManyTeamInput | TeamAllianceCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type TeamStatsCreateWithoutTeamInput = {
    id?: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutTeamStatsInput
    stage?: StageCreateNestedOneWithoutTeamStatsInput
  }

  export type TeamStatsUncheckedCreateWithoutTeamInput = {
    id?: string
    tournamentId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateOrConnectWithoutTeamInput = {
    where: TeamStatsWhereUniqueInput
    create: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput>
  }

  export type TeamStatsCreateManyTeamInputEnvelope = {
    data: TeamStatsCreateManyTeamInput | TeamStatsCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithoutTeamsInput = {
    update: XOR<TournamentUpdateWithoutTeamsInput, TournamentUncheckedUpdateWithoutTeamsInput>
    create: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutTeamsInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutTeamsInput, TournamentUncheckedUpdateWithoutTeamsInput>
  }

  export type TournamentUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutTournamentsNestedInput
    stages?: StageUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutTeamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: StringFieldUpdateOperationsInput | string
    stages?: StageUncheckedUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TeamAllianceUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamAllianceWhereUniqueInput
    update: XOR<TeamAllianceUpdateWithoutTeamInput, TeamAllianceUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamAllianceCreateWithoutTeamInput, TeamAllianceUncheckedCreateWithoutTeamInput>
  }

  export type TeamAllianceUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamAllianceWhereUniqueInput
    data: XOR<TeamAllianceUpdateWithoutTeamInput, TeamAllianceUncheckedUpdateWithoutTeamInput>
  }

  export type TeamAllianceUpdateManyWithWhereWithoutTeamInput = {
    where: TeamAllianceScalarWhereInput
    data: XOR<TeamAllianceUpdateManyMutationInput, TeamAllianceUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamStatsUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamStatsWhereUniqueInput
    update: XOR<TeamStatsUpdateWithoutTeamInput, TeamStatsUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamStatsCreateWithoutTeamInput, TeamStatsUncheckedCreateWithoutTeamInput>
  }

  export type TeamStatsUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamStatsWhereUniqueInput
    data: XOR<TeamStatsUpdateWithoutTeamInput, TeamStatsUncheckedUpdateWithoutTeamInput>
  }

  export type TeamStatsUpdateManyWithWhereWithoutTeamInput = {
    where: TeamStatsScalarWhereInput
    data: XOR<TeamStatsUpdateManyMutationInput, TeamStatsUncheckedUpdateManyWithoutTeamInput>
  }

  export type TeamCreateWithoutTeamAlliancesInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament?: TournamentCreateNestedOneWithoutTeamsInput
    teamStats?: TeamStatsCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamAlliancesInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teamStats?: TeamStatsUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamAlliancesInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamAlliancesInput, TeamUncheckedCreateWithoutTeamAlliancesInput>
  }

  export type AllianceCreateWithoutTeamAlliancesInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    match: MatchCreateNestedOneWithoutAlliancesInput
    allianceScoring?: AllianceScoringCreateNestedOneWithoutAllianceInput
  }

  export type AllianceUncheckedCreateWithoutTeamAlliancesInput = {
    id?: string
    color: string
    score?: number
    matchId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    allianceScoring?: AllianceScoringUncheckedCreateNestedOneWithoutAllianceInput
  }

  export type AllianceCreateOrConnectWithoutTeamAlliancesInput = {
    where: AllianceWhereUniqueInput
    create: XOR<AllianceCreateWithoutTeamAlliancesInput, AllianceUncheckedCreateWithoutTeamAlliancesInput>
  }

  export type TeamUpsertWithoutTeamAlliancesInput = {
    update: XOR<TeamUpdateWithoutTeamAlliancesInput, TeamUncheckedUpdateWithoutTeamAlliancesInput>
    create: XOR<TeamCreateWithoutTeamAlliancesInput, TeamUncheckedCreateWithoutTeamAlliancesInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutTeamAlliancesInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutTeamAlliancesInput, TeamUncheckedUpdateWithoutTeamAlliancesInput>
  }

  export type TeamUpdateWithoutTeamAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneWithoutTeamsNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type AllianceUpsertWithoutTeamAlliancesInput = {
    update: XOR<AllianceUpdateWithoutTeamAlliancesInput, AllianceUncheckedUpdateWithoutTeamAlliancesInput>
    create: XOR<AllianceCreateWithoutTeamAlliancesInput, AllianceUncheckedCreateWithoutTeamAlliancesInput>
    where?: AllianceWhereInput
  }

  export type AllianceUpdateToOneWithWhereWithoutTeamAlliancesInput = {
    where?: AllianceWhereInput
    data: XOR<AllianceUpdateWithoutTeamAlliancesInput, AllianceUncheckedUpdateWithoutTeamAlliancesInput>
  }

  export type AllianceUpdateWithoutTeamAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutAlliancesNestedInput
    allianceScoring?: AllianceScoringUpdateOneWithoutAllianceNestedInput
  }

  export type AllianceUncheckedUpdateWithoutTeamAlliancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    matchId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    allianceScoring?: AllianceScoringUncheckedUpdateOneWithoutAllianceNestedInput
  }

  export type MatchCreateWithoutMatchScoresInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stage: StageCreateNestedOneWithoutMatchesInput
    alliances?: AllianceCreateNestedManyWithoutMatchInput
    scoredBy?: UserCreateNestedOneWithoutScoredMatchesInput
    referees?: MatchRefereeCreateNestedManyWithoutMatchInput
  }

  export type MatchUncheckedCreateWithoutMatchScoresInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alliances?: AllianceUncheckedCreateNestedManyWithoutMatchInput
    referees?: MatchRefereeUncheckedCreateNestedManyWithoutMatchInput
  }

  export type MatchCreateOrConnectWithoutMatchScoresInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutMatchScoresInput, MatchUncheckedCreateWithoutMatchScoresInput>
  }

  export type MatchUpsertWithoutMatchScoresInput = {
    update: XOR<MatchUpdateWithoutMatchScoresInput, MatchUncheckedUpdateWithoutMatchScoresInput>
    create: XOR<MatchCreateWithoutMatchScoresInput, MatchUncheckedCreateWithoutMatchScoresInput>
    where?: MatchWhereInput
  }

  export type MatchUpdateToOneWithWhereWithoutMatchScoresInput = {
    where?: MatchWhereInput
    data: XOR<MatchUpdateWithoutMatchScoresInput, MatchUncheckedUpdateWithoutMatchScoresInput>
  }

  export type MatchUpdateWithoutMatchScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: StageUpdateOneRequiredWithoutMatchesNestedInput
    alliances?: AllianceUpdateManyWithoutMatchNestedInput
    scoredBy?: UserUpdateOneWithoutScoredMatchesNestedInput
    referees?: MatchRefereeUpdateManyWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutMatchScoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUncheckedUpdateManyWithoutMatchNestedInput
    referees?: MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput
  }

  export type TeamCreateWithoutTeamStatsInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament?: TournamentCreateNestedOneWithoutTeamsInput
    teamAlliances?: TeamAllianceCreateNestedManyWithoutTeamInput
  }

  export type TeamUncheckedCreateWithoutTeamStatsInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teamAlliances?: TeamAllianceUncheckedCreateNestedManyWithoutTeamInput
  }

  export type TeamCreateOrConnectWithoutTeamStatsInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTeamStatsInput, TeamUncheckedCreateWithoutTeamStatsInput>
  }

  export type TournamentCreateWithoutTeamStatsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    admin: UserCreateNestedOneWithoutTournamentsInput
    stages?: StageCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutTeamStatsInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    adminId: string
    stages?: StageUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutTeamStatsInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutTeamStatsInput, TournamentUncheckedCreateWithoutTeamStatsInput>
  }

  export type StageCreateWithoutTeamStatsInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutStagesInput
    matches?: MatchCreateNestedManyWithoutStageInput
  }

  export type StageUncheckedCreateWithoutTeamStatsInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    tournamentId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    matches?: MatchUncheckedCreateNestedManyWithoutStageInput
  }

  export type StageCreateOrConnectWithoutTeamStatsInput = {
    where: StageWhereUniqueInput
    create: XOR<StageCreateWithoutTeamStatsInput, StageUncheckedCreateWithoutTeamStatsInput>
  }

  export type TeamUpsertWithoutTeamStatsInput = {
    update: XOR<TeamUpdateWithoutTeamStatsInput, TeamUncheckedUpdateWithoutTeamStatsInput>
    create: XOR<TeamCreateWithoutTeamStatsInput, TeamUncheckedCreateWithoutTeamStatsInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutTeamStatsInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutTeamStatsInput, TeamUncheckedUpdateWithoutTeamStatsInput>
  }

  export type TeamUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneWithoutTeamsNestedInput
    teamAlliances?: TeamAllianceUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    tournamentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TournamentUpsertWithoutTeamStatsInput = {
    update: XOR<TournamentUpdateWithoutTeamStatsInput, TournamentUncheckedUpdateWithoutTeamStatsInput>
    create: XOR<TournamentCreateWithoutTeamStatsInput, TournamentUncheckedCreateWithoutTeamStatsInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutTeamStatsInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutTeamStatsInput, TournamentUncheckedUpdateWithoutTeamStatsInput>
  }

  export type TournamentUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutTournamentsNestedInput
    stages?: StageUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminId?: StringFieldUpdateOperationsInput | string
    stages?: StageUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type StageUpsertWithoutTeamStatsInput = {
    update: XOR<StageUpdateWithoutTeamStatsInput, StageUncheckedUpdateWithoutTeamStatsInput>
    create: XOR<StageCreateWithoutTeamStatsInput, StageUncheckedCreateWithoutTeamStatsInput>
    where?: StageWhereInput
  }

  export type StageUpdateToOneWithWhereWithoutTeamStatsInput = {
    where?: StageWhereInput
    data: XOR<StageUpdateWithoutTeamStatsInput, StageUncheckedUpdateWithoutTeamStatsInput>
  }

  export type StageUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutStagesNestedInput
    matches?: MatchUpdateManyWithoutStageNestedInput
  }

  export type StageUncheckedUpdateWithoutTeamStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: MatchUncheckedUpdateManyWithoutStageNestedInput
  }

  export type UserCreateManyCreatedByInput = {
    id?: string
    username: string
    password: string
    role: $Enums.UserRole
    email?: string | null
    gender?: boolean | null
    DateOfBirth?: Date | string | null
    phoneNumber?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TournamentCreateManyAdminInput = {
    id?: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchCreateManyScoredByInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    stageId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceScoringCreateManyRefereeInput = {
    id?: string
    allianceId: string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: $Enums.CardType
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeCreateManyUserInput = {
    id?: string
    matchId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUsers?: UserUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdUsers?: UserUncheckedUpdateManyWithoutCreatedByNestedInput
    tournaments?: TournamentUncheckedUpdateManyWithoutAdminNestedInput
    scoredMatches?: MatchUncheckedUpdateManyWithoutScoredByNestedInput
    allianceRefFor?: AllianceScoringUncheckedUpdateManyWithoutRefereeNestedInput
    matchReferees?: MatchRefereeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    email?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableBoolFieldUpdateOperationsInput | boolean | null
    DateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: StageUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stages?: StageUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutScoredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stage?: StageUpdateOneRequiredWithoutMatchesNestedInput
    alliances?: AllianceUpdateManyWithoutMatchNestedInput
    referees?: MatchRefereeUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutScoredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUncheckedUpdateManyWithoutMatchNestedInput
    referees?: MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutScoredByInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    stageId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceScoringUpdateWithoutRefereeInput = {
    id?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliance?: AllianceUpdateOneRequiredWithoutAllianceScoringNestedInput
  }

  export type AllianceScoringUncheckedUpdateWithoutRefereeInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceScoringUncheckedUpdateManyWithoutRefereeInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    scoreDetails?: NullableJsonNullValueInput | InputJsonValue
    card?: EnumCardTypeFieldUpdateOperationsInput | $Enums.CardType
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    match?: MatchUpdateOneRequiredWithoutRefereesNestedInput
  }

  export type MatchRefereeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StageCreateManyTournamentInput = {
    id?: string
    name: string
    type: $Enums.StageType
    startDate: Date | string
    endDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamCreateManyTournamentInput = {
    id?: string
    teamNumber: string
    name: string
    organization?: string | null
    avatar?: string | null
    description?: string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateManyTournamentInput = {
    id?: string
    teamId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StageUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: MatchUpdateManyWithoutStageNestedInput
    teamStats?: TeamStatsUpdateManyWithoutStageNestedInput
  }

  export type StageUncheckedUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matches?: MatchUncheckedUpdateManyWithoutStageNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutStageNestedInput
  }

  export type StageUncheckedUpdateManyWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumStageTypeFieldUpdateOperationsInput | $Enums.StageType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUpdateManyWithoutTeamNestedInput
    teamStats?: TeamStatsUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutTeamNestedInput
    teamStats?: TeamStatsUncheckedUpdateManyWithoutTeamNestedInput
  }

  export type TeamUncheckedUpdateManyWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    teamMembers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutTeamStatsNestedInput
    stage?: StageUpdateOneWithoutTeamStatsNestedInput
  }

  export type TeamStatsUncheckedUpdateWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUncheckedUpdateManyWithoutTournamentInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateManyStageInput = {
    id?: string
    matchNumber: number
    roundNumber?: number | null
    status?: string
    startTime?: Date | string | null
    scheduledTime?: Date | string | null
    endTime?: Date | string | null
    duration?: number | null
    winningAlliance?: string | null
    scoredById?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateManyStageInput = {
    id?: string
    teamId: string
    tournamentId: string
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUpdateManyWithoutMatchNestedInput
    scoredBy?: UserUpdateOneWithoutScoredMatchesNestedInput
    referees?: MatchRefereeUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliances?: AllianceUncheckedUpdateManyWithoutMatchNestedInput
    referees?: MatchRefereeUncheckedUpdateManyWithoutMatchNestedInput
    matchScores?: MatchScoresUncheckedUpdateOneWithoutMatchNestedInput
  }

  export type MatchUncheckedUpdateManyWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    matchNumber?: IntFieldUpdateOperationsInput | number
    roundNumber?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    startTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scheduledTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    winningAlliance?: NullableStringFieldUpdateOperationsInput | string | null
    scoredById?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutTeamStatsNestedInput
    tournament?: TournamentUpdateOneRequiredWithoutTeamStatsNestedInput
  }

  export type TeamStatsUncheckedUpdateWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUncheckedUpdateManyWithoutStageInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllianceCreateManyMatchInput = {
    id?: string
    color: string
    score?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MatchRefereeCreateManyMatchInput = {
    id?: string
    userId: string
    role: $Enums.RefereeRole
    position?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AllianceUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUpdateManyWithoutAllianceNestedInput
    allianceScoring?: AllianceScoringUpdateOneWithoutAllianceNestedInput
  }

  export type AllianceUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teamAlliances?: TeamAllianceUncheckedUpdateManyWithoutAllianceNestedInput
    allianceScoring?: AllianceScoringUncheckedUpdateOneWithoutAllianceNestedInput
  }

  export type AllianceUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMatchRefereesNestedInput
  }

  export type MatchRefereeUncheckedUpdateWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchRefereeUncheckedUpdateManyWithoutMatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumRefereeRoleFieldUpdateOperationsInput | $Enums.RefereeRole
    position?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceCreateManyAllianceInput = {
    id?: string
    teamId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceUpdateWithoutAllianceInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutTeamAlliancesNestedInput
  }

  export type TeamAllianceUncheckedUpdateWithoutAllianceInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceUncheckedUpdateManyWithoutAllianceInput = {
    id?: StringFieldUpdateOperationsInput | string
    teamId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceCreateManyTeamInput = {
    id?: string
    allianceId: string
    stationPosition?: number
    isSurrogate?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamStatsCreateManyTeamInput = {
    id?: string
    tournamentId: string
    stageId?: string | null
    wins?: number
    losses?: number
    ties?: number
    matchesPlayed?: number
    rank?: number | null
    tiebreaker1?: number
    tiebreaker2?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeamAllianceUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alliance?: AllianceUpdateOneRequiredWithoutTeamAlliancesNestedInput
  }

  export type TeamAllianceUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamAllianceUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    allianceId?: StringFieldUpdateOperationsInput | string
    stationPosition?: IntFieldUpdateOperationsInput | number
    isSurrogate?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutTeamStatsNestedInput
    stage?: StageUpdateOneWithoutTeamStatsNestedInput
  }

  export type TeamStatsUncheckedUpdateWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamStatsUncheckedUpdateManyWithoutTeamInput = {
    id?: StringFieldUpdateOperationsInput | string
    tournamentId?: StringFieldUpdateOperationsInput | string
    stageId?: NullableStringFieldUpdateOperationsInput | string | null
    wins?: IntFieldUpdateOperationsInput | number
    losses?: IntFieldUpdateOperationsInput | number
    ties?: IntFieldUpdateOperationsInput | number
    matchesPlayed?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    tiebreaker1?: FloatFieldUpdateOperationsInput | number
    tiebreaker2?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}