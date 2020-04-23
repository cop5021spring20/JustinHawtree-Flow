// @flow
// Need this annotation for flow to analyze this file passively

// Using null as a function
function pipe(x, f) { f(x); }

var hello = (s) => console.log("hello", s);
pipe("world", hello);

// Error in first pipe function
pipe("hello", null);

// A better pipe function to prevent null being used as a function
function pipe(x, f) {
  if (f != null) { f(x); }
}

var nil = { kind: "nil" };
var cons = (head, tail) => {
  return { kind: "cons", head, tail };
}

function sum(list) {
  if (list.kind === "cons") {
    return list.head + sum(list.tail);
  }
  return 0;
}

sum(cons(6, cons(7, nil)));

function merge(x) {
  x = x || nil;
  return x.kind;
}

// Using a member of a null object
function havoc(x) {
  function reset() { x = null; }
  x = x || nil;
  reset();
  return x.kind;
}

// Type annotations checking
function add(x: number, y: number): number{
  return x + y
}
// Error since we are passing in strings
add("hello", "world");

// A odd false positive that flow can not handle
function odd_false_positive(x /*:*/){
  console.log("Buggy bug");
}

odd_false_positive();
