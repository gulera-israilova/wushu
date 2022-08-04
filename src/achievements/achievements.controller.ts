import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AchievementsService} from "./achievements.service";
import {CreateAchievementDto} from "./dto/create-achievement.dto";
import {AchievementEntity} from "./entity/achievement.entity";
import {UpdateAchievementDto} from "./dto/update-achievement.dto";

@Controller('achievements')
@ApiTags('achievements')
export class AchievementsController {
    constructor(private achievementsService: AchievementsService) {}

    @ApiOperation({summary: 'Add athlete achievements'})
    @ApiBody({type: CreateAchievementDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created employee will be returned',
        type: AchievementEntity,
    })

    @Post()
    create(@Body() createAchievementDto: CreateAchievementDto) {
        return this.achievementsService.create(createAchievementDto);
    }

    @ApiOperation({summary: 'Get athlete\'s achievements'})
    @ApiParam({name: 'id', description: 'Sportsman id'})
    @ApiResponse({
        status: 201,
        description: 'Achievement list successfully returned',
        type: [AchievementEntity],
    })
    @Get('/get-by-sportsman/:id')
    async getBySportsman(@Param('id') id: number) {
        return this.achievementsService.getBySportsman(id);
    }

    @ApiOperation({summary: 'Get achievement by id'})
    @ApiParam({name: 'id', description: 'Achievement id'})
    @ApiResponse({
        status: 200,
        description: 'Achievement returned successfully',
        type: AchievementEntity,
    })
    @Get('/get-by-id/:id')
    async getById(@Param('id') id: number) {
        return this.achievementsService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update athlete\'s achievement'})
    @ApiParam({name: '2', description: 'Achievement id' })
    @ApiBody({type: UpdateAchievementDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated sportsman will be returned',
        type: [AchievementEntity],
    })
    async update(@Param('id') id: number, @Body() updateAchievementDto: UpdateAchievementDto) {
        return await this.achievementsService.update(id, updateAchievementDto);
    }

    @ApiOperation({summary: 'Delete achievement'})
    @ApiParam({name:"id",description:"Achievement id"})
    @ApiResponse({status: 200, description: 'Achievement deleted successfully'})
    @ApiResponse({status: 404, description: 'Achievement not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.achievementsService.destroy(id);
    }
}
