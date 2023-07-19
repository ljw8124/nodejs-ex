import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { User } from "./user.entity";
import { UserService } from "./user.service";

// url 이 user 로 시작된다는 의미
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/create')
    CreateUser(@Body() user: User) {
        return this.userService.createUser(user);
    }

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string) {
        const user = await this.userService.getUser(email);

        console.log(user);

        return user;
    }

    @Put('update/:email')
    updateUser(@Param('email') email: string, @Body() user: User) {
        console.log('변경할 유저 ==>', user);
        return this.userService.updateUser(email, user);
    }

    @Delete('delete/:email')
    deleteUser(@Param('email') email: string) {
        return this.userService.deleteUser(email);
    }
}


//