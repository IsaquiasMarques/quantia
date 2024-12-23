export function executeWhenReady<T>(
    array: any,
    callback: (element?: T) => void,
    intervalInSeconds: number = 1
): void{
    let int = setInterval(() => {
        if(('length' in array) && array.length > 0){
          clearInterval(int);
          callback()
        }
      }, intervalInSeconds * 1000)
}