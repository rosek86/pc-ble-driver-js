/* Copyright (c) 2016 Nordic Semiconductor. All Rights Reserved.
 *
 * The information contained herein is property of Nordic Semiconductor ASA.
 * Terms and conditions of usage are described in detail in NORDIC
 * SEMICONDUCTOR STANDARD SOFTWARE LICENSE AGREEMENT.
 *
 * Licensees are granted free, non-transferable use of the information. NO
 * WARRANTY of ANY KIND is provided. This heading must NOT be removed from
 * the file.
 *
 */

'use strict';

const assert = require('assert');
const testLib = require('./testLibrary').singletonContainer.testLibrary;
const sinon = require('sinon');

// Use old style 'function' here or else this.timeout won't work
describe('Adapter Connect', function() {
    this.timeout(10000);
    it('should be able to connect and disconnect without errors', done => {
        const errorSpy = sinon.spy();
        testLib._adapter.once('error', errorSpy);
        testLib.connectToPeripheral(process.env.testPeripheral)
            .then(device => {
                assert(!errorSpy.calledOnce);
                assert.equal(device.address, process.env.testPeripheral);
                return device;
            })
            .then(device => {
                testLib.disconnect(device.instanceId);
                return device;
            })
            .then(device => {
                assert(!errorSpy.calledOnce);
                assert.equal(device.address, process.env.testPeripheral);
                done();
            })
            .catch(done);
    });

    it('should be able to cancel a connect. connect handler should not be called', done => {
        const errorSpy = sinon.spy();
        testLib._adapter.once('error', errorSpy);

        // INVALID ADDRESS
        testLib.connectToPeripheral('12:7A:11:AD:12:E5')
            .then(device => {
                assert(!errorSpy.calledOnce);

                // TODO: Should it call the callback?
                assert(false, 'should not reach connect handler when canceling connect');
            })
            .catch((error => {
                assert(false, 'connect should not fail, just be canceled');
            }));
        testLib.cancelConnect()
            .then(() => {
                done();
            })
            .catch(error => {
                console.log(error);
            });
    });
});
