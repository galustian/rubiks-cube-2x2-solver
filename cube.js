export var cubeSides = ["top", "down", "front", "back", "left", "right"];

export class Cube {
    constructor(cubeColors) {
        this.cubeColors = cubeColors;
    }

    rotateSide(newCubeSides, prevSide, side) {
        newCubeSides[side][0] = prevSide[side][2];
        newCubeSides[side][1] = prevSide[side][0];
        newCubeSides[side][2] = prevSide[side][3];
        newCubeSides[side][3] = prevSide[side][1];
        return newCubeSides;
    }

    topR() { return this.top(this.top(this.top())); }
    downR() { return this.down(this.down(this.down())); }
    frontR() { return this.front(this.front(this.front())); }
    backR() { return this.back(this.back(this.back())); }
    leftR() { return this.left(this.left(this.left())); }
    rightR() { return this.right(this.right(this.right())); }

    top(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();

        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'top');

        newCubeSides['front'][0] = prevSide['right'][2];
        newCubeSides['front'][1] = prevSide['right'][0];

        newCubeSides['left'][1] = prevSide['front'][0];
        newCubeSides['left'][3] = prevSide['front'][1];

        newCubeSides['back'][3] = prevSide['left'][1];
        newCubeSides['back'][2] = prevSide['left'][3];

        newCubeSides['right'][2] = prevSide['back'][3];
        newCubeSides['right'][0] = prevSide['back'][2];

        return newCubeSides;
    }
    down(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();
        
        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'down');

        newCubeSides['front'][2] = prevSide['left'][0];
        newCubeSides['front'][3] = prevSide['left'][2];

        newCubeSides['left'][0] = prevSide['back'][1];
        newCubeSides['left'][2] = prevSide['back'][0];

        newCubeSides['back'][1] = prevSide['right'][3];
        newCubeSides['back'][0] = prevSide['right'][1];

        newCubeSides['right'][3] = prevSide['front'][2];
        newCubeSides['right'][1] = prevSide['front'][3];

        return newCubeSides;
    }
    
    front(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();
        
        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'front');

        newCubeSides['top'][2] = prevSide['left'][2];
        newCubeSides['top'][3] = prevSide['left'][3];

        newCubeSides['left'][2] = prevSide['down'][2];
        newCubeSides['left'][3] = prevSide['down'][3];

        newCubeSides['down'][2] = prevSide['right'][2];
        newCubeSides['down'][3] = prevSide['right'][3];

        newCubeSides['right'][2] = prevSide['top'][2];
        newCubeSides['right'][3] = prevSide['top'][3];

        return newCubeSides;
    }
    back(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();
        
        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'back');

        newCubeSides['top'][0] = prevSide['right'][0];
        newCubeSides['top'][1] = prevSide['right'][1];

        newCubeSides['right'][0] = prevSide['down'][0];
        newCubeSides['right'][1] = prevSide['down'][1];

        newCubeSides['down'][0] = prevSide['left'][0];
        newCubeSides['down'][1] = prevSide['left'][1];

        newCubeSides['left'][0] = prevSide['top'][0];
        newCubeSides['left'][1] = prevSide['top'][1];

        return newCubeSides;
    }

    left(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();
        
        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'left');

        newCubeSides['top'][0] = prevSide['back'][0];
        newCubeSides['top'][2] = prevSide['back'][2];

        newCubeSides['back'][0] = prevSide['down'][3];
        newCubeSides['back'][2] = prevSide['down'][1];

        newCubeSides['down'][3] = prevSide['front'][0];
        newCubeSides['down'][1] = prevSide['front'][2];

        newCubeSides['front'][0] = prevSide['top'][0];
        newCubeSides['front'][2] = prevSide['top'][2];

        return newCubeSides;
    }
    right(otherSide=null) {
        var prevSide = otherSide == null ? this.cubeColors : otherSide;
        var newCubeSides = {}
        for (const side of cubeSides) newCubeSides[side] = prevSide[side].slice();
        
        newCubeSides = this.rotateSide(newCubeSides, prevSide, 'right');

        newCubeSides['top'][1] = prevSide['front'][1];
        newCubeSides['top'][3] = prevSide['front'][3];

        newCubeSides['front'][1] = prevSide['down'][2];
        newCubeSides['front'][3] = prevSide['down'][0];

        newCubeSides['down'][2] = prevSide['back'][1];
        newCubeSides['down'][0] = prevSide['back'][3];

        newCubeSides['back'][1] = prevSide['top'][1];
        newCubeSides['back'][3] = prevSide['top'][3];

        return newCubeSides;
    }
}
