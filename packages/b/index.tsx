// This import does nothing at runtime, just making sure it is referenced
// If you comment in/out this line the type of `Capture` below changes
import { IMPORTANT_CONSTANT } from 'a'

// This type should be `boolean | "user" | "environment" | undefined` from @types/react@17
// it is the case until you import something from b, when it becomes `string | boolean | undefined`
// because b -> a -> @apollo/react-common -> @react/types@16 overrides the namespace.
type Capture = JSX.IntrinsicElements['input']['capture']
//   ^?

type ExpectedFromReactV17 = boolean | "user" | "environment" | undefined
type ActualFromReactV16 = string | boolean | undefined

// TS errors here until you comment out the import from 'a' above.
assert<Expect<Capture, ExpectedFromReactV17>>()

// Contrarily, this will be OK as long as something is imported from 'b', which is not
assert<Expect<Capture, ActualFromReactV16>>()



// Type-testing utils
type Expect<T, U> = T[] extends U[] ? U[] extends T[] ? true : false : false
function assert<T extends true>() {}