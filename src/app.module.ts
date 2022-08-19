import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DB_CONFIG} from './utils/db_config';
import {UsersModule} from './users/users.module';
import {ClubsModule} from './clubs/clubs.module';
import {MailModule} from './services/mail/mail.module';
import {SportsmenModule} from './sportsmen/sportsmen.module';
import {S3Module} from './s3/s3.module';
import {NewsModule} from './news/news.module';
import {EventsModule} from './events/events.module';
import {MessagesModule} from './messages/messages.module';
import {CloudinaryModule} from "./services/cloudinary/cloudinary.module";
import {DocsModule} from './docs/docs.module';
import {ApplicationsModule} from './applications/applications.module';
import {SubgroupsModule} from './subgroups/subgroups.module';
import {CalendarModule} from './calendar/calendar.module';
import {AchievementsModule} from './achievements/achievements.module';
import {StandardsModule} from './standards/standards.module';
import {OfpModule} from './ofp/ofp.module';
import {SportsmenSubgroupsModule} from './sportsmen-subgroups/sportsmen-subgroups.module';
import {AchievementRatingModule} from './achievement-rating/achievement-rating.module';
import {NotificationsModule} from './notifications/notifications.module';
import {LobbyModule} from './lobby/lobby.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(DB_CONFIG),
        UsersModule,
        ClubsModule,
        MailModule,
        SportsmenModule,
        S3Module,
        NewsModule,
        EventsModule,
        MessagesModule,
        DirectModule,
        LobbyModule,
        CloudinaryModule,
        DocsModule,
        ApplicationsModule,
        SubgroupsModule,
        CalendarModule,
        AchievementsModule,
        StandardsModule,
        OfpModule,
        SportsmenSubgroupsModule,
        AchievementRatingModule,
        NotificationsModule,
        CloudinaryModule,
        LobbyModule
    ],
})
export class AppModule {
}
