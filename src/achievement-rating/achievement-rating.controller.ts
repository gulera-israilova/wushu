import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AchievementRatingService} from "./achievement-rating.service";
import {AchievementRatingEntity} from "./entity/achievement-rating.entity";

@Controller('achievement-rating')
@ApiTags('achievement-rating')
export class AchievementRatingController {
    constructor(private achievementRatingService: AchievementRatingService) {}

    @ApiOperation({summary: 'Generate achievement rating'})
    @ApiResponse({
        status: 201,
        description: 'Achievement rating list successfully returned',
        type: [AchievementRatingEntity],
    })
    @Get()
    async getOfp() {
        return this.achievementRatingService.getOfp();
    }

    @ApiOperation({summary: 'Get athlete\'s achievement rating'})
    @ApiParam({name: 'id', description: 'Sportsman id'})
    @ApiQuery({name: 'year', description: 'example: 2022',required:false})
    @ApiResponse({
        status: 201,
        description: 'Achievement rating list successfully returned',
        type: [AchievementRatingEntity],
    })
    @Get('/get-by-sportsman/:id')
    async getBySportsman(@Param('id') id: number,@Query('year') year: number) {
        return this.achievementRatingService.getBySportsman(id,year);
    }

}
