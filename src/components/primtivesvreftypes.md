```
let firstName = "Tyler"
let lastName = "McGinnis"
let displayName = `${firstName} ${lastName}`

function getMarried (newLastName) {
  lastName = newLastName
}

getMarried("Brown")

console.log("firstName:", firstName)
console.log("lastName:", lastName)
console.log("displayName:", displayName)
```

```
firstName: Tyler
lastName: Brown
displayName: Tyler McGinnis
```

Even though function getMarried changes the value of last name the value of display name does not change because it copied the value of lastName
prior to the update made by the function. when we assign one primitive value to another, like we're doing with displayName, what we're really doing is making an independent copy of the value and creating a new spot in memory.

The variable displayName was initialized before lastName was changed by getMarried. Therefore, it retains the value it was given at initialization time, which is "Tyler McGinnis". This is because displayName holds the value that was computed at the time of its initialization, and changing lastName afterward does not retroactively alter displayName.


```
let leo = {
  type: "Dog",
  age: 0,
  goodBoy: true,
  name: "Leo",
}

let snoop = leo

snoop.name = "Snoop"

console.log("leo's name:", leo.name)
console.log("snoop's name:", snoop.name)
console.log(snoop == leo) //true

```


```
snoop's name: Snoop
leo's name: Snoop
true
```

With reference types when we create a new variable and assign it to a reference value like snoop, we point it to the same (reference) spot in memory. When we update that spot in memory both variables are updated to the new value.

Since snoop and leo both reference the same object, the comparison snoop === leo evaluates to true.


```
const me = "Tyler"
const friend = "Tyler"

console.log(me === friend)
```

true


```
const leo = {
  type: "Dog",
  name: "Leo",
}

const leito = {
  type: "Dog",
  name: "Leo",
}

console.log(leo === leito)
```

false
Even though leo and leito have the same properties and values, when comparing them with the identity operator, we get false.
The reason for that is because, unlike primitive values which are compared by their value,
reference values are compared by their location in memory.


```
const a = {}
const b = a
```

a === b

a === b evaluates to true since both a and b point to the same spot in memory. When comparing reference values, the identity operator compares the memory address of the value, not the value itself.

```
{} === {}
```

{} === {} evaluates to false since both objects are stored in different spots in memory.


```

const nope = () => ({})
const noop = () => ({})

nope === noop

```

nope === noop evaluates to false since both functions are stored in different spots in memory


```
const c = []
const d = c

c === d
```
c === d evaluates to true since both c and d point to the same spot in memory.


```
const nope = () => ({})
const noop = () => ({})

nope() === noop()
```

nope() === noop() evaluates to false since both objects returned from our function invocations are stored in different spots in memory.


```
[] === []

```
[] === [] evaluates to false since both arrays are stored in different spots in memory


*** the way React works is that whenever state changes, it will re-render the component that owns that state and all of its child components – regardless of whether or not those child components accept any props. ***

If you do have an expensive component and you want that component to opt out of this default behavior by only re-rendering when its props change, you can use React's React.memo higher-order component.

memoization is a process that allows us to cache the values of recursive/expensive function calls so that the next time the function is called with the same argument(s), the cached value is returned rather than having to re-compute the function.




import * as React from "react"

function Wave () {
  console.count("Rendering Wave")
  return (
    <span role="img" aria-label="hand waving">
      👋
    </span>
  )
}

function Counts() {
  const renderCount = useRef(0);
  return (
    <div className="mt-3">
      <p className="dark:text-white">
        Nothing has changed here but I've now rendered:{" "}
        <span className="dark:text-green-300 text-grey-900">
          {(renderCount.current ++)} time(s)
      </span>
      </p>
    </div>
  );
}
export default React.memo(Counts);

**React.memo() is a higher-order component (HOC), which is a fancy name for a component that takes a component as a prop and returns a component**


export default React.memo(Wave)

//since this compnoent takes no props, will never re=render.

If however we pass an object as a prop <Wave options={{ animate: true, tone: 4 }} />
because reference values are compared by their location in memory, even though the properties on our object never change, we're technically creating and passing a brand new object on every render – nullifying the benefits of React.memo. since we're now re-creating a new object on every render

useMemo lets you cache the result of a calculation between renders.
Frist argument is the function to calculate, the second is the list of dependcies to monitor, the change of which would trigger the function to recalcuate and re-render the component.

```
const handleWaveClick = React.useMemo(() => {
  return () => {
    const nextIndex = waveIndex === 5
      ? 0
      : waveIndex + 1
    setWaveIndex(nextIndex)
  }
}, [waveIndex])
```

Whenever you need to memoize a function, instead of returning a function from useMemo as we did above, you can use React's useCallback hook to make it a little easier. It works exactly the same as useMemo, except instead of caching the result of calling a function, it caches the function itself.


Whenever you need to memoize a function, instead of returning a function from useMemo as we did above, you can use React's useCallback hook to make it a little easier.


const cachedFn = React.useCallback(
  fnToCache,`
  dependencies
)

const handleWaveClick = useCallback(() => {
    const nextIndex = waveIndex === 5 ? 0: waveIndex + 1
    setWaveIndex(nextIndex)
}, [waveIndex])
