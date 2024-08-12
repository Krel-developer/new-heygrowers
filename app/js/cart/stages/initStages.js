import { initStageChanger } from './stageChanger'
import { initStage_1 } from './stage_1/initStage_1'
import { initStage_2 } from './stage_2/initStage_2'
import { initStage_3 } from './stage_3/initStage_3'

export function krelInitStages() {
  // Здесь описан функционал переключения между шагами
  initStageChanger()

  // Активируем шаг 1 (корзина)
  initStage_1()

  // Активируем шаг 2 (доставка)
  initStage_2()

  // Активируем шаг 3 (оформление заказа)
  initStage_3()
}
