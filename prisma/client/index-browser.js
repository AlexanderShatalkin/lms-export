
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  middleName: 'middleName',
  avatarUrl: 'avatarUrl',
  role: 'role',
  confirmToken: 'confirmToken',
  lastSignIn: 'lastSignIn',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  disableState: 'disableState',
  accessTags: 'accessTags'
};

exports.Prisma.RelationLoadStrategy = {
  query: 'query',
  join: 'join'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  expiresAt: 'expiresAt'
};

exports.Prisma.UserDataScalarFieldEnum = {
  userId: 'userId',
  theme: 'theme',
  lang: 'lang',
  sidebarSettings: 'sidebarSettings',
  tableSettings: 'tableSettings',
  updatedAt: 'updatedAt',
  courseId: 'courseId'
};

exports.Prisma.AccessFlagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  courseId: 'courseId'
};

exports.Prisma.CustomSymbolScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  quickType: 'quickType',
  active: 'active',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  description: 'description',
  avatarUrl: 'avatarUrl',
  ownerId: 'ownerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted'
};

exports.Prisma.CourseMemberScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  courseId: 'courseId',
  role: 'role',
  accessTags: 'accessTags',
  activeState: 'activeState',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudyGroupScalarFieldEnum = {
  id: 'id',
  name: 'name',
  avatarUrl: 'avatarUrl',
  ownerId: 'ownerId',
  courseId: 'courseId',
  allowRework: 'allowRework',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted',
  archived: 'archived'
};

exports.Prisma.StudyGroupMemberScalarFieldEnum = {
  id: 'id',
  email: 'email',
  studyGroupId: 'studyGroupId',
  role: 'role',
  activeState: 'activeState',
  tags: 'tags',
  initiatorId: 'initiatorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CourseTagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  authorId: 'authorId',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskVariantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content: 'content',
  order: 'order',
  taskTemplateId: 'taskTemplateId',
  deleted: 'deleted'
};

exports.Prisma.TaskScalarFieldEnum = {
  id: 'id',
  name: 'name',
  inputType: 'inputType',
  order: 'order',
  content: 'content',
  taskTemplateId: 'taskTemplateId',
  workVariantId: 'workVariantId',
  taskVariantId: 'taskVariantId',
  baseTaskId: 'baseTaskId',
  workNoteId: 'workNoteId',
  editDisabled: 'editDisabled',
  deleted: 'deleted',
  active: 'active'
};

exports.Prisma.UploadScalarFieldEnum = {
  id: 'id',
  path: 'path',
  originalName: 'originalName',
  size: 'size',
  humanSize: 'humanSize',
  meta: 'meta',
  instanceId: 'instanceId',
  userId: 'userId',
  type: 'type',
  createdAt: 'createdAt'
};

exports.Prisma.WorkNoteScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  courseId: 'courseId',
  taskId: 'taskId',
  authorId: 'authorId',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkNoteAnswerScalarFieldEnum = {
  id: 'id',
  answerUrls: 'answerUrls',
  workNoteId: 'workNoteId',
  userId: 'userId',
  scoreId: 'scoreId',
  finishDate: 'finishDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskCommentScalarFieldEnum = {
  id: 'id',
  value: 'value',
  taskId: 'taskId',
  userId: 'userId',
  taskVariantId: 'taskVariantId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TaskTemplateScalarFieldEnum = {
  id: 'id',
  description: 'description',
  public: 'public',
  name: 'name',
  inputType: 'inputType',
  authorId: 'authorId',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExamTaskScalarFieldEnum = {
  id: 'id',
  description: 'description',
  authorId: 'authorId',
  courseId: 'courseId',
  taskId: 'taskId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkVariantScalarFieldEnum = {
  id: 'id',
  name: 'name',
  workId: 'workId',
  workVariantTypeId: 'workVariantTypeId',
  base: 'base',
  order: 'order',
  deleted: 'deleted'
};

exports.Prisma.WorkVariantTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  description: 'description',
  courseId: 'courseId',
  colorScheme: 'colorScheme',
  systemName: 'systemName',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  hideCompletedTasks: 'hideCompletedTasks',
  hideChat: 'hideChat',
  deleted: 'deleted',
  studyGroupId: 'studyGroupId',
  courseId: 'courseId',
  linkedWorkId: 'linkedWorkId'
};

exports.Prisma.WorkTemplateScalarFieldEnum = {
  id: 'id',
  public: 'public',
  workId: 'workId',
  authorId: 'authorId',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExamTicketScalarFieldEnum = {
  id: 'id',
  workId: 'workId',
  authorId: 'authorId',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StudyWorkScalarFieldEnum = {
  id: 'id',
  workId: 'workId',
  courseCreated: 'courseCreated',
  authorId: 'authorId',
  studyGroupId: 'studyGroupId',
  workTypeId: 'workTypeId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  startDate: 'startDate',
  finishDate: 'finishDate',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReworkScalarFieldEnum = {
  id: 'id',
  workId: 'workId',
  declined: 'declined',
  userId: 'userId',
  studyGroupId: 'studyGroupId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.WorkTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  description: 'description',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserWorkScalarFieldEnum = {
  id: 'id',
  startDate: 'startDate',
  endDate: 'endDate',
  userId: 'userId',
  workVariantId: 'workVariantId',
  workId: 'workId'
};

exports.Prisma.UserWorkAnswerScalarFieldEnum = {
  id: 'id',
  answer: 'answer',
  taskId: 'taskId',
  userId: 'userId',
  scoreId: 'scoreId',
  status: 'status',
  startDate: 'startDate',
  finishDate: 'finishDate',
  dangerActions: 'dangerActions',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserWorkCommentScalarFieldEnum = {
  id: 'id',
  value: 'value',
  userWorkAnswerId: 'userWorkAnswerId',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.MaterialScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contentType: 'contentType',
  authorId: 'authorId',
  courseId: 'courseId',
  materialTypeId: 'materialTypeId',
  content: 'content',
  active: 'active',
  contViews: 'contViews',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MaterialTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  description: 'description',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityScalarFieldEnum = {
  id: 'id',
  name: 'name',
  startDate: 'startDate',
  useTime: 'useTime',
  authorId: 'authorId',
  studyGroupId: 'studyGroupId',
  courseId: 'courseId',
  workId: 'workId',
  chatId: 'chatId',
  activityTypeId: 'activityTypeId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityBoardScalarFieldEnum = {
  id: 'id',
  activityId: 'activityId',
  page: 'page',
  value: 'value',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityUserStatisticScalarFieldEnum = {
  id: 'id',
  spentTime: 'spentTime',
  activityId: 'activityId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  shortName: 'shortName',
  description: 'description',
  courseId: 'courseId',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnnouncementScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content: 'content',
  studyGroupId: 'studyGroupId',
  courseId: 'courseId',
  pinned: 'pinned',
  deleted: 'deleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AnnouncementViewScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  announcementId: 'announcementId',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  type: 'type',
  content: 'content',
  userId: 'userId',
  initiatorId: 'initiatorId',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.ColumnScalarFieldEnum = {
  id: 'id',
  name: 'name',
  order: 'order',
  type: 'type',
  studyGroupId: 'studyGroupId',
  workTypeId: 'workTypeId',
  activityTypeId: 'activityTypeId',
  baseTaskId: 'baseTaskId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted'
};

exports.Prisma.ScoreScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  columnId: 'columnId',
  createdAt: 'createdAt',
  value: 'value',
  estimatorId: 'estimatorId'
};

exports.Prisma.ComputedColumnScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  order: 'order',
  courseId: 'courseId',
  formula: 'formula',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  showFormat: 'showFormat',
  pinned: 'pinned',
  hidden: 'hidden'
};

exports.Prisma.EventLogScalarFieldEnum = {
  id: 'id',
  initiatorId: 'initiatorId',
  studyGroupId: 'studyGroupId',
  courseId: 'courseId',
  newValue: 'newValue',
  oldValue: 'oldValue',
  eventType: 'eventType',
  initiatorType: 'initiatorType',
  entityId: 'entityId',
  createdAt: 'createdAt'
};

exports.Prisma.ChatScalarFieldEnum = {
  id: 'id',
  creatorId: 'creatorId',
  avatarUrl: 'avatarUrl',
  type: 'type',
  courseContextId: 'courseContextId',
  studyGroupContextId: 'studyGroupContextId',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted'
};

exports.Prisma.ChatUserScalarFieldEnum = {
  id: 'id',
  chatId: 'chatId',
  userId: 'userId',
  inviterId: 'inviterId',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  chatId: 'chatId',
  userId: 'userId',
  forwardMessageId: 'forwardMessageId',
  replayedMessageId: 'replayedMessageId',
  content: 'content',
  pinned: 'pinned',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deleted: 'deleted'
};

exports.Prisma.AttachmentScalarFieldEnum = {
  id: 'id',
  messageId: 'messageId',
  uploadId: 'uploadId',
  createdAt: 'createdAt'
};

exports.Prisma.ReactionMessageScalarFieldEnum = {
  id: 'id',
  reactionId: 'reactionId',
  messageId: 'messageId',
  userId: 'userId'
};

exports.Prisma.ReactionScalarFieldEnum = {
  id: 'id',
  code: 'code',
  createdAt: 'createdAt',
  uploadId: 'uploadId',
  userId: 'userId'
};

exports.Prisma.ReadedMessagesScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  messageId: 'messageId',
  createdAt: 'createdAt'
};

exports.Prisma.UserAnswerLogScalarFieldEnum = {
  id: 'id',
  eventType: 'eventType',
  userAnswerId: 'userAnswerId',
  value: 'value',
  newComment: 'newComment',
  status: 'status',
  initiatorId: 'initiatorId',
  createdAt: 'createdAt'
};

exports.Prisma.ChangeLogScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content: 'content',
  version: 'version',
  viewsCount: 'viewsCount',
  issueTypes: 'issueTypes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChangeLogReactionScalarFieldEnum = {
  id: 'id',
  changeLogId: 'changeLogId',
  emoji: 'emoji',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IssueScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content: 'content',
  code: 'code',
  changeLogId: 'changeLogId',
  type: 'type',
  priority: 'priority',
  status: 'status',
  authorId: 'authorId',
  public: 'public',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IssueReactionScalarFieldEnum = {
  id: 'id',
  value: 'value',
  issueId: 'issueId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IssueCommentScalarFieldEnum = {
  id: 'id',
  issueId: 'issueId',
  userId: 'userId',
  content: 'content',
  parentCommentId: 'parentCommentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IssueCommentReactionScalarFieldEnum = {
  id: 'id',
  issueCommentId: 'issueCommentId',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LegalScalarFieldEnum = {
  id: 'id',
  content: 'content',
  type: 'type',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CodeTaskScalarFieldEnum = {
  id: 'id',
  name: 'name',
  mainFunctionName: 'mainFunctionName',
  returnType: 'returnType',
  description: 'description',
  difficulty: 'difficulty',
  showDataInTesting: 'showDataInTesting',
  authorId: 'authorId',
  allowedLanguages: 'allowedLanguages',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.InputVariableScalarFieldEnum = {
  id: 'id',
  name: 'name',
  taskId: 'taskId',
  order: 'order',
  nullable: 'nullable',
  type: 'type'
};

exports.Prisma.TestCaseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  order: 'order',
  explanation: 'explanation',
  showInExample: 'showInExample',
  taskId: 'taskId',
  outputValue: 'outputValue'
};

exports.Prisma.TestCaseInputScalarFieldEnum = {
  id: 'id',
  testCaseId: 'testCaseId',
  inputVariableId: 'inputVariableId',
  value: 'value'
};

exports.Prisma.TestCaseRunScalarFieldEnum = {
  id: 'id',
  testCaseId: 'testCaseId',
  solutionId: 'solutionId',
  status: 'status',
  timeMs: 'timeMs',
  errTitle: 'errTitle',
  errContent: 'errContent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CodeSolutionScalarFieldEnum = {
  id: 'id',
  taskId: 'taskId',
  programmingLanguage: 'programmingLanguage',
  userId: 'userId',
  code: 'code',
  asAnswer: 'asAnswer',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuizScalarFieldEnum = {
  id: 'id',
  name: 'name',
  avatarUrl: 'avatarUrl',
  greeting: 'greeting',
  courseId: 'courseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuizExerciseScalarFieldEnum = {
  id: 'id',
  name: 'name',
  content: 'content',
  quizId: 'quizId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuizExerciseAnswerScalarFieldEnum = {
  id: 'id',
  type: 'type',
  content: 'content',
  quizExerciseId: 'quizExerciseId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.QuizUserAnswerScalarFieldEnum = {
  id: 'id',
  type: 'type',
  content: 'content',
  userId: 'userId',
  quizExerciseId: 'quizExerciseId',
  correct: 'correct',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  GUEST: 'GUEST'
};

exports.UserDisableState = exports.$Enums.UserDisableState = {
  DELETED: 'DELETED',
  BANNED: 'BANNED',
  NOT_CONFIRMED: 'NOT_CONFIRMED'
};

exports.AccessTag = exports.$Enums.AccessTag = {
  MANAGE_CHANGE_LOGS: 'MANAGE_CHANGE_LOGS',
  MANAGE_LEGAL: 'MANAGE_LEGAL'
};

exports.CourseMemberRole = exports.$Enums.CourseMemberRole = {
  OWNER: 'OWNER',
  SEMINARIAN: 'SEMINARIAN',
  NONE: 'NONE'
};

exports.CourseMemberActivateState = exports.$Enums.CourseMemberActivateState = {
  INVITED: 'INVITED',
  ACTIVATED: 'ACTIVATED',
  DECLINED: 'DECLINED'
};

exports.CourseMemberAccessTag = exports.$Enums.CourseMemberAccessTag = {
  EDIT_TEMPLATE: 'EDIT_TEMPLATE',
  CREATE_STUDY_GROUP: 'CREATE_STUDY_GROUP'
};

exports.StudyGroupMemberRole = exports.$Enums.StudyGroupMemberRole = {
  STUDENT: 'STUDENT',
  HEAD_BOY: 'HEAD_BOY',
  SEMINARIAN: 'SEMINARIAN',
  NONE: 'NONE'
};

exports.StudyGroupMemberActiveState = exports.$Enums.StudyGroupMemberActiveState = {
  INVITED: 'INVITED',
  ACTIVATED: 'ACTIVATED',
  DECLINED: 'DECLINED'
};

exports.CourseTagType = exports.$Enums.CourseTagType = {
  TASK_TEMPLATE: 'TASK_TEMPLATE',
  WORK_TEMPLATE: 'WORK_TEMPLATE',
  CODE_TASK: 'CODE_TASK'
};

exports.InputType = exports.$Enums.InputType = {
  EDITOR: 'EDITOR',
  FILE: 'FILE'
};

exports.UploadType = exports.$Enums.UploadType = {
  MATERIAL: 'MATERIAL',
  WORK: 'WORK',
  USER_ANSWER: 'USER_ANSWER',
  CHAT: 'CHAT',
  AVATAR: 'AVATAR',
  OTHER: 'OTHER',
  WORK_NOTE: 'WORK_NOTE',
  ACTIVITY: 'ACTIVITY'
};

exports.TaskStatus = exports.$Enums.TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  NEED_WORKS: 'NEED_WORKS',
  DONE: 'DONE'
};

exports.MaterialContentType = exports.$Enums.MaterialContentType = {
  FILE: 'FILE',
  LINK: 'LINK',
  PAGE: 'PAGE'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  TASK_ON_REVIEW: 'TASK_ON_REVIEW',
  INVITE_TO_STUDY_GROUP: 'INVITE_TO_STUDY_GROUP',
  INVITE_TO_COURSE: 'INVITE_TO_COURSE',
  TASK_NEED_WORK: 'TASK_NEED_WORK',
  CREATE_REWORK: 'CREATE_REWORK',
  CREATE_USER_WORK: 'CREATE_USER_WORK',
  CREATE_TASK_SCORE: 'CREATE_TASK_SCORE'
};

exports.ColumnType = exports.$Enums.ColumnType = {
  BY_TASK: 'BY_TASK',
  MANUAL: 'MANUAL'
};

exports.ComputedColumnShowFormat = exports.$Enums.ComputedColumnShowFormat = {
  ALL: 'ALL',
  AUTO: 'AUTO',
  SELECTED: 'SELECTED'
};

exports.InitiatorType = exports.$Enums.InitiatorType = {
  SYSTEM: 'SYSTEM',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  SUPPORT: 'SUPPORT'
};

exports.ChatType = exports.$Enums.ChatType = {
  GROUP: 'GROUP',
  SINGLE: 'SINGLE',
  ACTIVITY: 'ACTIVITY'
};

exports.ChatUserRole = exports.$Enums.ChatUserRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

exports.UserAnswerLogType = exports.$Enums.UserAnswerLogType = {
  CHANGE_STATUS: 'CHANGE_STATUS',
  EDIT_ANSWER: 'EDIT_ANSWER',
  EDIT_ANSWER_BY_PASTE: 'EDIT_ANSWER_BY_PASTE',
  EDIT_ANSWER_BY_PASTE_FROM_OUTSIDE: 'EDIT_ANSWER_BY_PASTE_FROM_OUTSIDE',
  COPY_ANSWER: 'COPY_ANSWER'
};

exports.IssueType = exports.$Enums.IssueType = {
  BUG: 'BUG',
  FEATURE: 'FEATURE',
  IMPROVEMENT: 'IMPROVEMENT'
};

exports.IssuePriority = exports.$Enums.IssuePriority = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

exports.IssueStatus = exports.$Enums.IssueStatus = {
  DONE: 'DONE',
  DISCUSSION: 'DISCUSSION',
  IN_PROGRESS: 'IN_PROGRESS',
  MODERATION: 'MODERATION',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT'
};

exports.LegalType = exports.$Enums.LegalType = {
  OFFER: 'OFFER',
  POLICY: 'POLICY',
  AGREEMENT: 'AGREEMENT'
};

exports.LegalStatus = exports.$Enums.LegalStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
};

exports.CodeDataType = exports.$Enums.CodeDataType = {
  INT: 'INT',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  ARRAY_INT: 'ARRAY_INT',
  ARRAY_STRING: 'ARRAY_STRING',
  ARRAY_BOOLEAN: 'ARRAY_BOOLEAN'
};

exports.CodeTaskDifficulty = exports.$Enums.CodeTaskDifficulty = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.ProgrammingLanguage = exports.$Enums.ProgrammingLanguage = {
  C_PLUS: 'C_PLUS',
  PYTHON: 'PYTHON',
  JS: 'JS',
  TS: 'TS',
  PYTHON2: 'PYTHON2',
  JAVA: 'JAVA'
};

exports.TestCaseRunStatus = exports.$Enums.TestCaseRunStatus = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  PENDING: 'PENDING'
};

exports.QuizExerciseAnswerType = exports.$Enums.QuizExerciseAnswerType = {
  TEXT: 'TEXT',
  BUTTON: 'BUTTON'
};

exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  UserData: 'UserData',
  AccessFlag: 'AccessFlag',
  CustomSymbol: 'CustomSymbol',
  Course: 'Course',
  CourseMember: 'CourseMember',
  StudyGroup: 'StudyGroup',
  StudyGroupMember: 'StudyGroupMember',
  CourseTag: 'CourseTag',
  TaskVariant: 'TaskVariant',
  Task: 'Task',
  Upload: 'Upload',
  WorkNote: 'WorkNote',
  WorkNoteAnswer: 'WorkNoteAnswer',
  TaskComment: 'TaskComment',
  TaskTemplate: 'TaskTemplate',
  ExamTask: 'ExamTask',
  WorkVariant: 'WorkVariant',
  WorkVariantType: 'WorkVariantType',
  Work: 'Work',
  WorkTemplate: 'WorkTemplate',
  ExamTicket: 'ExamTicket',
  StudyWork: 'StudyWork',
  Rework: 'Rework',
  WorkType: 'WorkType',
  UserWork: 'UserWork',
  UserWorkAnswer: 'UserWorkAnswer',
  UserWorkComment: 'UserWorkComment',
  Material: 'Material',
  MaterialType: 'MaterialType',
  Activity: 'Activity',
  ActivityBoard: 'ActivityBoard',
  ActivityUserStatistic: 'ActivityUserStatistic',
  ActivityType: 'ActivityType',
  Announcement: 'Announcement',
  AnnouncementView: 'AnnouncementView',
  Notification: 'Notification',
  Column: 'Column',
  Score: 'Score',
  ComputedColumn: 'ComputedColumn',
  EventLog: 'EventLog',
  Chat: 'Chat',
  ChatUser: 'ChatUser',
  Message: 'Message',
  Attachment: 'Attachment',
  ReactionMessage: 'ReactionMessage',
  Reaction: 'Reaction',
  ReadedMessages: 'ReadedMessages',
  UserAnswerLog: 'UserAnswerLog',
  ChangeLog: 'ChangeLog',
  ChangeLogReaction: 'ChangeLogReaction',
  Issue: 'Issue',
  IssueReaction: 'IssueReaction',
  IssueComment: 'IssueComment',
  IssueCommentReaction: 'IssueCommentReaction',
  Legal: 'Legal',
  CodeTask: 'CodeTask',
  InputVariable: 'InputVariable',
  TestCase: 'TestCase',
  TestCaseInput: 'TestCaseInput',
  TestCaseRun: 'TestCaseRun',
  CodeSolution: 'CodeSolution',
  Quiz: 'Quiz',
  QuizExercise: 'QuizExercise',
  QuizExerciseAnswer: 'QuizExerciseAnswer',
  QuizUserAnswer: 'QuizUserAnswer'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
