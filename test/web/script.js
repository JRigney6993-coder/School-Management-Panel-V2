async function test(a) {
    var yes = await eel.test(a)();
    alert(yes);
}

test("aaa")