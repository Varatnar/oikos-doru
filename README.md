# Oikos Doru

![build](https://github.com/Varatnar/oikos-doru/workflows/build/badge.svg)
[![codecov](https://codecov.io/gh/varatnar/oikos-doru/branch/master/graph/badge.svg)](https://codecov.io/gh/varatnar/oikos-doru)

Oikos doru, simplification of ancient greek meaning family tree.

This library exposes an object that contains any type of data and can have parent-child relationships. It is also iterable and contains some utility functions.

## Usage

Create a new container with the data that you want associated with it.

```ts
const container = new TreeElement("content");
```

You can add children to this container.

```ts
container.addChild("contentOfChild");
container.addChild(new TreeElement("otherContent"));
```

You can retrieve the children of a container.

```ts
container.getChildren();
```

You can clear the children of a container.

```ts
container.clearChildren();
```

You can access the parent of a child.

```ts
child.getParent();
```

You can retrieve the data of a container.

```ts
container.getData();
```

It is also possible to attempt to cast it (may cause an exception).

```ts
const container = new TreeElement<string | number>("text");

container.getData<string>().includes("text"); // true and typescript will not complain
```

You can check if the container is the root (has no parent).

```ts
container.isRoot();
```

You can print the string value of the container (which is the string value of its data)

```ts
container.toString();
```

The container is iterable by default, it will iterate through the children. The iteration
goes through every child as if it was all a pile.

```ts
for (const child of container) {
    // do something with child
}

container.foreach(child => {
   // do something with child
};
```

Example :

```ts
const container = new TreeElement("content");
const childOne = container.addChild("data 1");
const childTwo = container.addChild("data 2");
const childOneOne = childOne.addChild("data 1 1");

container.forEach(child => console.log(child.toString());

// data 1
// data 1 1
// data 2
```

## Requirement

* Node.js https://nodejs.org/

## Build

1. Run the `yarn` command to install all the dependencies.

    ```bash
       $ yarn
    ```  
    
1. Build the project by calling `yarn build`

    ```bash
       $ yarn build
    ```

The built artifacts are available at `projectRoot/bin`

## Test

1. Run the tests by calling `yarn test`

    ```bash
       $ yarn test
    ```
