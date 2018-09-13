const mongoose = require('mongoose')
const config = require('./config.js')

const Radio = require('./mongoModels/radio')
const Tube = require('./mongoModels/tube')
const TubeContainerLink = require('./mongoModels/tubeContainerLink')



mongoose.connection.once('open', () => {
    console.log('connected to database')
})
mongoose.connect(config.MONGOOSE_CONNECT_URL, { useNewUrlParser: true })

const getTubesByContainerId = async (containerId) => {
    const links = await TubeContainerLink.find({ containerId })
    const tubes = []
    for (link of links) {
        const tube = await Tube.findById(link.tubeId)
        tubes.push(tube)
    }
    return tubes
}

const addTubeToRadio = async (tubeId, containerId, quantity) => {
    const link = await new TubeContainerLink({
        tubeId,
        quantity,
        containerId
    })
    return link.save()
}

const run = async () => {
    const tubes = await getTubesByContainerId('5b87175fbee388043e2fdf95')
    console.log(tubes)

    /*
    const link = await addTubeToRadio(
        '5b8723e2026cbb2338c7848c',
        '5b87102f78c9c472679b4211',
        1
    )
    console.log(link)
    */
}

run()

const hero = {
    health: 100,
}

Object.defineProperty(hero, 'status', {
    get: function () {
        if (this.health > 50) {
            return 'fit like a champ'
        } else {
            return 'badly hurt'
        }
    }
})
/*
console.log(hero.status)
hero.health = 40
console.log(hero.status)
*/


class Test {
    constructor(x = 0, y = 0) {
        this._x = x
        this._y = y
    }

    get x() {
        return _x
    }

    get y() {
        return _y
    }

    set x(x) {
        this._x = x
    }

    set y(y) {
        this._y = y
    }
}


const t = new Test()
t.x = 10
t.y = 1.5
console.log(t)


let a = {
    v: 10,
    c: 'a'
}

const proxy = new Proxy(a, {
    get: (target, name) => {
        console.log(target)
        console.log(name)
        return target[name]
    }
}
)

console.log(proxy.c)
console.log(proxy.c)
console.log(proxy.c)
console.log(proxy.c)
console.log(proxy.c)

