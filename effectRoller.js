// Stronger:
//     Sets all your stats to 15.
//     Lasts 20 seconds.
//     Makes you rainbow colored.
//
// Sidewinder:
//     Summons a Stronger Sidewinder Snake when you left click, which has a 3 second cooldown
//     Lasts 20 seconds.
//
// Hedgehog:
//     Increases your max speed and acceleration by 400%.
//     Lasts 20 seconds.
//
// Focus:
//     Decreases spread by 50% and all your guns shoot forward.
//     Lasts 10 seconds.
//
// Machine Gun:
//     Applies g.mach to your guns.
//     Lasts 20 seconds.
//
// Damage Sponge:
//     Increases your Max Health and Shield by 400%.
//     Lasts 10 seconds.
//
// Vanish:
//     Makes you invisible.
//     Lasts 20 seconds.

// Growth Annihilator:
//     Spawns a Stronger LVL 250 Growth Annihilator, which shoots you once from 10-20 players of distance away and then despawns.
//
// No Health:
//     Sets your shield to 0 and sets your health to 1% of max health.
//
// Slippery:
//     Decreases your acceleration by 66% and increases your max speed by 50%.
//     Lasts 20 seconds.
//
// Vulnerable:
//     Decreases your Max Health and Shield by 80%.
//     Lasts 10 seconds.
//
// Black Hole:
//     Movable entities near you get pulled towards you.
//     Lasts 15 seconds.
//
// Time Bomb:
//     Makes you explode in 10 seconds, killing you and damaging nearby entities.

let { mach: gMach } = require('../gunvals.js'),
effectStrings = [
    ['Stronger',           'You feel very strong...'],
    ['Sidewinder',         'Press Alt-Fire to launch a Snake.'],
    ['Hedgehog',           'Gotta go fast!'],
    ['Focus',              'Concentrated fire is very powerful.'],
    ['Machine Gun',        'SPAM SPAM SPAM!'],
    ['Damage Sponge',      'Hehe, that bullet tickles!'],
    ['Growth Annihilator', 'WATCH OUT!!'],
    ['No Health',          'Oh..'],
    ['Slippery',           'Why is the floor suddenly out of ice?'],
    ['Vulnerable',         "Don't even get breathed on!"],
    ['Black Hole',         'GROUP HUG!!!'],
    ['Time Bomb',          'I must sacrifice myself suddenly...'],
],
IDs = {
    Stronger: 0,
    Sidewinder: 1,
    Hedgehog: 2,
    Focus: 3,
    MachineGun: 4,
    DamageSponge: 5,
    GrowthAnnihilator: 6,
    NoHealth: 7,
    Slippery: 8,
    Vulnerable: 9,
    BlackHole: 10,
    TimeBomb: 11
},
durations = {
    [IDs.Stronger]: 20,
    [IDs.Sidewinder]: 20,
    [IDs.Hedgehog]: 20,
    [IDs.Focus]: 10,
    [IDs.MachineGun]: 20,
    [IDs.DamageSponge]: 10,
    [IDs.GrowthAnnihilator]: 0,
    [IDs.NoHealth]: 0,
    [IDs.Slippery]: 20,
    [IDs.Vulnerable]: 10,
    [IDs.BlackHole]: 15,
    [IDs.TimeBomb]: 10
},
StatusEffects = {
    [IDs.Stronger]: new StatusEffect(durations[IDs.Hedgehog] * 30, undefined, body => {
        let e = new Entity(body),
            ang = Math.random() * Math.PI * 2;
        e.define('genericEntity');
        e.velocity.x = 5 * Math.sin(ang);
        e.velocity.y = 5 * Math.cos(ang);
        e.SIZE = body.SIZE;
        e.coreSize = body.coreSize;
        e.alpha = 0.5;
        setTimeout(() => e.kill(), 100);
    }),
    [IDs.Sidewinder]: undefined,
    [IDs.Hedgehog]: new StatusEffect(durations[IDs.Hedgehog] * 30, { acceleration: 5, topSpeed: 5 }),
    [IDs.Focus]: undefined,
    [IDs.MachineGun]: undefined,
    [IDs.DamageSponge]: new StatusEffect(durations[IDs.DamageSponge] * 30, { health: 5, shield: 5 }),
    [IDs.GrowthAnnihilator]: undefined,
    [IDs.NoHealth]: undefined,
    [IDs.Slippery]: new StatusEffect(durations[IDs.Slippery] * 30, { acceleration: 1 / 3, topSpeed: 1.5 }),
    [IDs.Vulnerable]: new StatusEffect(durations[IDs.Vulnerable] * 30, { health: 0.2, shield: 0.2 }),
    [IDs.BlackHole]: undefined,
    [IDs.TimeBomb]: undefined
},
endNotification = (socket, name, duration) => setTimeout(()=> socket.talk('m', name + ' is about to end in 5 seconds!'), duration * 1000 - 5000);

module.exports = ({ Class, Config, Events }) => {
    Events.on('chatMessage', ({message, socket}) => {
        if (!/[!/$]roll/.test(message)) return;

        let body = socket.player.body,
            effectId = Math.floor(Math.random() * 12),
            [name, splash] = effectStrings[effectId];
        socket.talk('m', splash);
        socket.talk('m', name);

        if (StatusEffects[effectId]) {
            body.addStatusEffect(StatusEffects[effectId]);
        }

        switch (effectId) {
            case IDs.Stronger:
                let colorOld = body.color,
                    rawOld = body.skill.raw.map(x=>x),
                    capsOld = body.skill.caps.map(x=>x),
                    stronk = Array(10).fill(15);
                body.skill.setCaps(stronk);
                body.skill.set(stronk);
                body.color = 36;

                endNotification(socket, name, durations[IDs.Stronger]);
                setTimeout(()=>{
                    body.skill.setCaps(capsOld);
                    body.skill.set(rawOld);
                    body.color = colorOld;
                }, 20_000);
                break;

            case IDs.Sidewinder:
                endNotification(socket, name, durations[IDs.Sidewinder]);
            case IDs.Hedgehog:
                endNotification(socket, name, durations[IDs.Hedgehog]);
                break;

            case IDs.Focus:
                endNotification(socket, name, durations[IDs.Focus]);
            case IDs.MachineGun:
                for (let gun of body.guns) {
                    let gun;
                    for (let stat in gMach) {
                        gun.settings[stat] *= gMach[stat];
                    }
                    gun.trueRecoil = gMach.recoil;
                }
                endNotification(socket, name, durations[IDs.MachineGun]);
            case IDs.DamageSponge:
                endNotification(socket, name, durations[IDs.DamageSponge]);
                break;

            case IDs.GrowthAnnihilator:
            case IDs.NoHealth:
                body.health.amount = body.health.max / 100;
                body.shield.amount = 0;
                break;

            case IDs.Slippery:
                endNotification(socket, name, durations[IDs.Slippery]);
                break;

            case IDs.Vulnerable:
                endNotification(socket, name, durations[IDs.Vulnerable]);
                break;

            case IDs.BlackHole:
                endNotification(socket, name, durations[IDs.Hedgehog]);
                break;
            case IDs.TimeBomb:
                socket.talk('m', name + ' is about to detonate in ' + durations[IDs.TimeBomb] + ' seconds!')
        }
    });
};