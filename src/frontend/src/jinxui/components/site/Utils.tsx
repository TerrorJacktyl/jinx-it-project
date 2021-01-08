export function listDelete(list: any[], index: number) {
  if (index > -1 && index < list.length) {
    return [...list.slice(0, index), ...list.slice(index + 1)]
  } else {
    throw Error("Index out of range");
  }
}

export function listMoveUp(list: any[], index: number) {
  if (index > -1 && index < list.length) {
    if (index === 0) {
      return list;
    }

    const top = list.slice(0, index - 1);
    const oneAbove = list.slice(index - 1, index);
    const thisElement = list[index]
    const rest = list.slice(index + 1);

    return [...top, thisElement, ...oneAbove, ...rest]
  } else {
    throw Error("Index out of range");
  }
}

export function listMoveDown(list: any[], index: number) {
  if (index > -1 && index < list.length) {
    if (index === list.length - 1) {
      return list;
    }

    const top = list.slice(0, index);
    const thisElement = list[index];
    const oneBelow = list.slice(index + 1, index + 2);
    const rest = list.slice(index + 2);

    return [...top, ...oneBelow, thisElement, ...rest];
  } else {
    throw Error("Index out of range");
  }
}

export function listAdd<T>(list: T[], index: number, newElement: T) {
  if (index > -1) {
    return [...list.slice(0, index), newElement, ...list.slice(index)]
  } else {
    throw Error("Index out of range");
  }
}