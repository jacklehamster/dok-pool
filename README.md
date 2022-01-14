# dok-pool
Resource pool for games.

[![Create Release](https://github.com/jacklehamster/dok-pool/actions/workflows/release.yml/badge.svg)](https://github.com/jacklehamster/dok-pool/actions/workflows/release.yml)
![Node.js Package](https://github.com/jacklehamster/dok-pool/workflows/Node.js%20Package/badge.svg)

## Overview

This object is a resource pool for games. Resource pool are used to avoid re-allocating objects constantly, by basically recycling them.

- Here, the pool provides objects with pool.get(). The first time, when the pool is empty, it will allocate for each pool.get().
- Then when all objects are used (generally at the end of a game loop), the pool gets reset (pool.reset()).
- Now every new call to pool.get() will simply reused an allocated object. (as they are some allocated objects).

## Usage:

```javascript
function creatorFunction() {
    return { foo: null, bar: null };
}

function initFunction(elem) {
   elem.foo = null;
   elem.bar = null;
}

const pool = new Pool(creatorFunction, initFunction);

function loop() {
   const a = pool.get(true);
   const b = pool.get(true);
   const c = pool.get(true);
   //...
   pool.reset();
   requestAnimationFrame(loop);
}
loop();

//  while you constantly call the loop, the pool lets you create new objects without allocating them.

```

## Methods:
```
pool.get();         // returns an object, either retrieving a used object or allocates a new one.
pool.get(true);     // returns an object and call the "init" function provided in the constructor. By default, it's false. It does help for performance if you don't have to constantly call init.
pool.reset();       // all objects of the pool used so far are now marked as reusable. So a call to pool.get() will retrieve from the object already used.

pool.recycle(obj);  // sometimes, an object got allocated outside the resource pool. We can just recycle that object into the resource pool, so that pool.get() will just return that object.

```

## Warning:
```
This is how not to use the resource pool:

const a = pool.get();

pool.reset();

const b = pool.get();

// now, a and b likely point to the same object, or maybe not. It's probably not what you want to achieve.



```


