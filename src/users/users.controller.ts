import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateWithoutPasswordDto } from './dto/CreateWithoutPassword.dto';
import { CreateIndependentDto } from './dto/CreateIndependent.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Successfully created user will be returned',
        type: UserEntity,
    })
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
    @ApiOperation({ summary: `admin registers smb` })
    @ApiResponse({
        status: 201,
        description: 'The link is sent',
    })
    @Post('referral')
    async createWithLink(@Body() dto: CreateWithoutPasswordDto) {
        await this.usersService.createWithoutPassword(dto);
    }

    @ApiOperation({ summary: `independent registration` })
    @ApiResponse({
        status: 201,
        description: `User should verify email`,
    })
    @Post('/independent')
    async createIndependent(@Body() dto: CreateIndependentDto) {
        await this.usersService.createIndependent(dto);
    }

    @ApiOperation({ summary: 'Get a list of all users' })
    @ApiQuery({ name: 'page', description: 'Page number', required: false })
    @ApiQuery({ name: 'limit', description: 'Item limit', required: false })
    @ApiResponse({
        status: 201,
        description: 'List of users returned successfully',
        type: [UserEntity],
    })
    @Get()
    async get(@Query('page') page: number, @Query('limit') limit: number) {
        return this.usersService.get(page, limit);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiParam({ name: 'id', description: 'User id' })
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
    @ApiOperation({ summary: 'Update user' })
    @ApiParam({ name: 'id', description: 'Identification number' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 201,
        description: 'Successfully updated user will be returned',
        type: [UserEntity],
    })
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiParam({ name: 'id', description: 'User id' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.usersService.destroy(id);
    }
}
