import React, { useState } from 'react';

const remainingCells:number[] = Array.from(Array(81).keys())

const generateInitial = () => {

    var grid = []

    for(let i=0; i<9; i++){
        var row = []
        for(let j=0; j<9; j++){
            row.push(Math.ceil(Math.random() * 9))
        }
        grid.push(row)

    }


    console.log(grid)
}

export const generateSolved = () => {
    const cell: { value?: number, index: number, row: number, column: number, block: number }[] = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            var index = (9 * i) + j
            var block = -1
            if (i < 3) {
                if (j < 3) {
                    block = 1;
                } else if (j < 6) {
                    block = 2
                } else {
                    block = 3
                }
            } else if (i < 6) {
                if (j < 3) {
                    block = 4;
                } else if (j < 6) {
                    block = 5
                } else {
                    block = 6
                }
            } else {
                if (j < 3) {
                    block = 7;
                } else if (j < 6) {
                    block = 8
                } else {
                    block = 9
                }
            }
            const newCell: { value?: number, index: number, row: number, column: number, block: number } = { value: undefined, index: index, row: i, column: j, block: block }
            cell.push(newCell)
        }
    }
    generateInitial()
}

