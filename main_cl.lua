RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)
end)

RegisterNUICallback('get-callback', function(data, cb)
	SetNuiFocus(false, false)
    Callbackk({ status = data.status, given = data.inputPass})
    cb('ok')
end)

function PasswordInput(data, callback)
    Callbackk = callback
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "open",
        data = data
    })
end

-- RegisterCommand("keypad",function()
--     testPassword = 1234
--     print('password: '..testPassword)
--     exports['deniz-keypad']:PasswordInput(testPassword, function(data)
--         if data.status == true and data.given == testPassword then
--             print('approved')
--         else 
--             print('denied')
--         end
--     end)
-- end)

exports('PasswordInput', PasswordInput)