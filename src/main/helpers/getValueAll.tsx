
export const getValueAllStyle = (node:any,value:string) => {
    const element = node as HTMLElement;
    const elementStyle = window.getComputedStyle(element);
    const elementValue = elementStyle.getPropertyValue(value);

  return {
      elementValue
  }
}
