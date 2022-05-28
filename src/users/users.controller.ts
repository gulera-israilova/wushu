import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entity/user.entity";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
@ApiTags("users")

export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create user'})
    @ApiBody({type: CreateUserDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created user will be returned',
        type: UserEntity
    })
    @Post()
    createEmployee(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @ApiOperation({summary: 'Get a list of all users'})
    @ApiQuery({name: 'page', description: "Page number", required: false})
    @ApiQuery({name: 'limit', description: "Item limit", required: false})
    @ApiResponse({
        status: 201,
        description: 'List of users returned successfully',
        type: [UserEntity],
    })
    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        return this.usersService.findAll(page,limit)
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiParam({name: 'id', description: 'User id'})
    @ApiResponse({
        status: 200,
        description: 'User returned successfully',
        type: [UserEntity],
    })
    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return this.usersService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update user'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateUserDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated user will be returned',
        type: [UserEntity],
    })
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiParam({name:"id",description:"User id"})
    @ApiResponse({status: 200, description: 'User deleted successfully'})
    @ApiResponse({status: 404, description: 'User not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.usersService.destroy(id)
    }
}
