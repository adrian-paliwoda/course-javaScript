const sayHello = () => {
  console.log('Hi Unknown');
}


const getHello = (name = "Unknown") => {
  return 'Hi ' + name;
}


const sayHello1 = (name = "Unknown") => {
  console.log('Hi ' + name);
}

const sayHello2 = (greetings = "Hi", name = "Unknown") => {
  console.log(greetings + " " + name);
}

const checkInput = (handler, ...args) =>
{
  let hasEmptyText = false;
  for (let i = 0; i <args.length; i++) {
    if (typeof args[i] == 'string' && args[i] === undefined && args[i] === '')
    {
      hasEmptyText = true;
      break;
    }
  }

  if (!hasEmptyText)
  {
    handler();
  }

}

sayHello();
sayHello1("Adrian");
sayHello2("Hello ", "Adrian");
console.log(getHello("Adrian"));


checkInput(() => {
}, "Unknown", "Other", "Something");