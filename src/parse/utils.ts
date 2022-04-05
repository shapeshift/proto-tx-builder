import {
  Array,
  Literal,
  PairCase,
  Record,
  Runtype,
  Static,
  String,
  Union,
  when,
} from "runtypes";

export const Coin = Record({
  denom: String,
  amount: String,
});
export type Coin = Static<typeof Coin>;

export const StdFee = Record({
  amount: Array(Coin),
  gas: String,
});
export type StdFee = Static<typeof StdFee>;

export function assert<T extends Runtype>(
  rt: T,
  x: unknown
): asserts x is Static<T> {
  rt.assert(x);
}

export function asTuple<T extends [any, ...any[]]>(x: T): T {
  return x;
}

export type RuntypesOfMatcherList<
  A extends [PairCase<any, any>, ...PairCase<any, any>[]]
> = {
  [key in keyof A]: A[key] extends PairCase<infer RT, any> ? RT : unknown;
};

export function runtypesOfMatcherList<
  T extends [PairCase<any, any>, ...PairCase<any, any>[]]
>(x: T): RuntypesOfMatcherList<T> {
  return x.map((y) => y[0]) as RuntypesOfMatcherList<T>;
}

export function legacyMsgRuntype<T extends string, U extends Runtype>(
  type: T,
  valueRuntype: U
) {
  return Record({
    type: Literal(type),
    value: valueRuntype,
  });
}

export function legacyMsgMatcher<
  T extends string,
  U extends Runtype,
  V extends string,
  W extends Runtype
>(
  legacyType: T,
  legacyValueRuntype: U,
  nativeTypeUrl: V,
  nativeValueRuntype: W,
  toFrom: (x: Static<U>) => string,
  toMsg: (x: Static<U>) => Static<W>
) {
  return when(legacyMsgRuntype(legacyType, legacyValueRuntype), (x) => ({
    from: toFrom((x as any).value),
    msg: {
      typeUrl: nativeTypeUrl,
      value: nativeValueRuntype.check(toMsg((x as any).value)),
    },
  }));
}

export function legacyMsgSimpleMatcher<
  T extends string,
  U extends string,
  V extends Runtype
>(
  legacyType: T,
  nativeTypeUrl: U,
  valueRuntype: V,
  toSender: (x: Static<V>) => string | null | undefined
) {
  return when(legacyMsgRuntype(legacyType, valueRuntype), (x: any) => {
    const sender = toSender(x.value);
    if (!sender) {
      throw new Error(`Sender missing from ${x.type} message`);
    }
    return {
      from: sender,
      msg: {
        typeUrl: nativeTypeUrl,
        value: x.value,
      },
    };
  });
}

export function nativeMsgRuntype<T extends string, U extends Runtype>(
  typeUrl: T,
  valueRuntype: U
) {
  return Record({
    typeUrl: Literal(typeUrl),
    value: valueRuntype,
  });
}

export function nativeMsgMatcher<T extends string, U extends Runtype>(
  typeUrl: T,
  valueRuntype: U
) {
  return when(nativeMsgRuntype(typeUrl, valueRuntype), (x) => x);
}

export function fieldOfUnionOfRecords<
  T extends Union<[Record<any, any>, ...Record<any, any>[]]>,
  U extends keyof Static<T>
>(type: T, fieldName: U): Runtype<Static<T>[U]> {
  return Union(
    ...(type.alternatives.map((z) => z.fields[fieldName]) as any)
  ) as Runtype<Static<T>[U]>;
}
