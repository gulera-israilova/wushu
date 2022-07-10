import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateWithoutPasswordDto } from './dto/CreateWithoutPassword.dto';
import { CreateIndependentDto } from './dto/CreateIndependent.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RoleEnum } from './enum/role.enum';
import { ForgotDto } from './dto/forgot.dto';
import { ProfileChangePasswordDto } from './dto/profile-change-password.dto';
import { UserGuard } from '../guards/user.guard';
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: `admin registers smb` })
  @ApiResponse({
    status: 201,
    description: 'The link is sent',
  })
  @Post('referral')
  async createWithLink(@Body() dto: CreateWithoutPasswordDto) {
    return await this.usersService.createWithoutPassword(dto);
  }

  @ApiOperation({ summary: 'validate check if user is registered in db' })
  @Get('check-valid')
  async check(
    @Query('id') id: number,
    @Query('tmp') tmp: string,
  ): Promise<string> {
    return await this.usersService.checkUser(id, tmp);
  }

  @ApiOperation({ summary: 'add password' })
  @Patch('addPassword')
  async addPassword(@Body() dto: ChangePasswordDto) {
    return await this.usersService.addPass(dto);
  }

  @ApiOperation({
    summary: `independent registration(for example trainer can register on his own and the link will be sent to mail after he should wait to be confirmed by admin)`,
  })
  @ApiResponse({
    status: 201,
    description: `User should verify email`,
  })
  @Post('/independent')
  async createIndependent(@Body() dto: CreateIndependentDto) {
    return await this.usersService.createIndependent(dto);
  }
  @ApiOperation({ summary: `Make confirmed status` })
  @Patch('/update-registered-status/:id')
  async udpateStatus(@Param('id') id: number) {
    return await this.usersService.updateStatus1(id);
  }
  @ApiOperation({ summary: `Profile change password` })
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @Patch('profile-change-password')
  async profile_change(@Body() dto: ProfileChangePasswordDto, @Request() req) {
    return await this.usersService.updateProfile(dto, req.user.id);
  }

  @ApiOperation({ summary: `Forgot Password` })
  @Patch('forgot-password')
  async forgotPassword(@Body() dto: ForgotDto) {
    return await this.usersService.forgotPassword(dto);
  }

  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiQuery({ name: 'page', description: 'Page number', required: false })
  @ApiQuery({ name: 'limit', description: 'Item limit', required: false })
  @ApiQuery({ name: 'role', description: 'user role', required: false })
  @ApiResponse({
    status: 201,
    description: 'List of users returned successfully',
    type: [UserEntity],
  })
  @Get()
  async get(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role: RoleEnum,
  ) {
    return await this.usersService.get(page, limit, role);
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
    return await this.usersService.getById(id);
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
  async destroy(@Param('id') id: number) {
    return await this.usersService.destroy(id);
  }
}
