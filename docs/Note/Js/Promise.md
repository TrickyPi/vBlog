# Promise重新理解

## new Promise(resolve,reject)

new promise时传入的函数有两个函数参数（resolve，reject）；

如果传给resolve的值是一个非Promise、非thenable的立即值，这个promise就会用这个值完成；但是，如果传给resolve的是一个真正的Promise值或thenable值，这个值就会被递归展开，并且要构造的promise将取用其最终决议值或状态；

如果传给reject的值是一个非Promise、非thenable的立即值，这个promise就会用这个值完成；reject函数并不会像resolve一样展开传入的Promise值和thenable值,他会把这个值原封不动地设置为拒绝理由，后续的拒绝处理函数接收到的是你实际传给reject()的那个promise/thenable，而不是底层的立即值；

## Promise.then(onFulfilled,onRejected)

promsie.then的完成处理函数和拒绝处理函数返回一个promise或者一个thenable对象时，都会对其进行展开，最后展开得到的决议值作为返回的promise决议值；如果任意一个回调返回非Promise、非thenable的立即值，这个值会被用作返回promise的完成值；

## Promise.resolve()&Promise.reject()

Promise.resolve()接受参数为如果一个真正的promise，将会直接返回这个promise；如果是一个thenable，将会展开这个thenable对象，返回的promise根据展开的状态来决议；如果是一个立即值，就会返回一个用该值决议的一个promise；

Promise.reject()直接会返回一个Promsie，其实决议值为传入的参数（Promise/thenable/立即值）；（Chrome上的调试结果）