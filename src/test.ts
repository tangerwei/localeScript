import "reflect-metadata"

const key = "zzzzzzz"

@modifyClass('new Prop')
class A {

    @modifyProp type: string

    name: string

    constructor (name) {
        this.name = name
    }

    @modifyMethod
    say (@modifyParam word) {
        let str = Reflect.getMetadata(key, this)
        console.log(str)
    }
}

function modifyClass (name) {
    return (target) => {
        target.prototype.extra = name
    }
}

function modifyProp (target, propertyKey) {
    // 修改属性
    console.log(target)
    console.log(propertyKey)
    target[propertyKey] = 'modfiyed by decorator'
}

function modifyMethod (target, propertyKey, descriptor) {
    // console.error(target, propertyKey, descriptor)
    Reflect.defineMetadata(key, 'Hello Reflect',target)
    const fun = descriptor.value
    descriptor.value = function () {
        // console.log(this) // 运行时确定因此这里是的 this 指向实例的。如果这里是箭头函数，this则指向undefined
        return fun.apply(this, arguments)
    }
}

function modifyParam (target, propertyKey, index) {
    console.log(target)
    console.log(propertyKey)
    console.log(index)
}

function main(){
    const a = new A("duke");
    a.say("xxxxz")
}

main();